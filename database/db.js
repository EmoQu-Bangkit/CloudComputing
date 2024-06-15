// db.js
const admin = require('firebase-admin');
const dotenv = require('dotenv');

// Load environment variables from process.env
dotenv.config();

const initializeFirestoreAndAuth = () => {
  try {
    // Debug prints
    console.log("GOOGLE_CLOUD_KEYFILE:", process.env.GOOGLE_CLOUD_KEYFILE ? "Loaded" : "Not Set");
    console.log("FIREBASE_DATABASE_URL:", process.env.FIREBASE_DATABASE_URL);

    // Check if GOOGLE_CLOUD_KEYFILE environment variable is set
    if (!process.env.GOOGLE_CLOUD_KEYFILE) {
      throw new Error('GOOGLE_CLOUD_KEYFILE environment variable is not set.');
    }

    // Parse the service account key
    let serviceAccountKey;
    try {
      serviceAccountKey = JSON.parse(process.env.GOOGLE_CLOUD_KEYFILE);
    } catch (error) {
      throw new Error('Error parsing GOOGLE_CLOUD_KEYFILE JSON: ' + error.message);
    }

    // Check if FIREBASE_DATABASE_URL environment variable is set
    if (!process.env.FIREBASE_DATABASE_URL) {
      throw new Error('FIREBASE_DATABASE_URL environment variable is not set.');
    }

    const databaseURL = process.env.FIREBASE_DATABASE_URL;

    // Initialize Firebase Admin SDK
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey),
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

module.exports = initializeFirestoreAndAuth()