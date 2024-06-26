//user.js
const dbPromise = require("../database/db.js");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const admin = require('firebase-admin');
require('dotenv').config();

class User {
  constructor(firstName, lastName, email, password) {
    this.id = nanoid(16);
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  static async get(email) {
    const { db } = await dbPromise;
    const snapshot = await db.collection("users").where("email", "==", email).get();
    if (snapshot.empty) {
      return null;
    }
    return snapshot.docs[0];
  }

  static async list() {
    const { db } = await dbPromise;
    return db.collection("users").get();
  }

  async save() {
    try {
      if (!this.password || this.password.length === 0) {
        throw new Error("Password is required");
      }

      const hashedPassword = await bcrypt.hash(this.password, 10);
      const { db, admin } = await dbPromise;

      // Check if the user already exists in Firebase Authentication
      let userRecord;
      try {
        userRecord = await admin.auth().getUserByEmail(this.email);
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          userRecord = null;  // User does not exist
        } else {
          console.error("Error checking user existence in Firebase Auth:", error);
          throw new Error("Error checking user existence in Firebase Auth.");
        }
      }

      if (userRecord) {
        throw new Error("The email address is already in use by another account.");
      }

      // Create user in Firebase Authentication
      try {
        userRecord = await admin.auth().createUser({
          uid: this.id,
          email: this.email,
          emailVerified: false,
          password: this.password,
          displayName: `${this.firstName} ${this.lastName}`,
          disabled: false
        });
      } catch (error) {
        console.error("Error creating user in Firebase Auth:", error);
        throw new Error("Error creating user in Firebase Auth.");
      }

      // Store user data in Firestore
      try {
        await db.collection("users").doc(this.id).set({
          id: this.id,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: hashedPassword
        });
      } catch (error) {
        console.error("Error saving user data to Firestore:", error);
        throw new Error("Error saving user data to Firestore.");
      }

      return userRecord;
    } catch (error) {
      console.error("Error saving user:", error.message);
      throw error;
    }
  }
}

module.exports = User;
