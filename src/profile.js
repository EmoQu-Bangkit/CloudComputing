// profile.js
const dbPromise = require("../database/db.js");

class Profile {
  constructor(userId, firstName, lastName, email, photoUrl = "", about = "") {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.photoUrl = photoUrl;
    this.about = about;
  }

  static async get(userId) {
    const { db } = await dbPromise;
    const doc = await db.collection("users").doc(userId).get();
    if (!doc.exists) {
      return null;
    }
    return doc.data();
  }

  static async update(userId, updates) {
    const { db } = await dbPromise;
    await db.collection("users").doc(userId).update(updates);
  }

  static async setProfilePhoto(userId, photoUrl) {
    const { db } = await dbPromise;
    await db.collection("users").doc(userId).update({ photoUrl });
  }

  static async deleteProfilePhoto(userId) {
    const { db } = await dbPromise;
    await db.collection("users").doc(userId).update({ photoUrl: '' });
  }

  static async setAbout(userId, about) {
    const { db } = await dbPromise;
    await db.collection("users").doc(userId).update({ about });
  }
}

module.exports = Profile;
