const admin = require('firebase-admin');
const dotenv = require('dotenv');

// Load environment variables from process.env
dotenv.config();

const initializeFirestoreAndAuth = () => {
  try {
    // Check if FIREBASE_DATABASE_URL environment variable is set
    if (!process.env.FIREBASE_DATABASE_URL) {
      throw new Error('FIREBASE_DATABASE_URL environment variable is not set.');
    }

    const databaseURL = process.env.FIREBASE_DATABASE_URL;

    // Initialize Firebase Admin SDK using Application Default Credentials
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: databaseURL
    });

    // Initialize Firestore
    const db = admin.firestore();

    return { db, admin };
  } catch (error) {
    console.error('Error initializing Firestore and Firebase Admin:', error.message);
    throw error;
  }
};

module.exports = initializeFirestoreAndAuth();
