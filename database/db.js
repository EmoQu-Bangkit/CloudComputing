// db.js
const admin = require('firebase-admin');
const dotenv = require('dotenv');

// Load environment variables from process.env
dotenv.config();

const serviceAccountKey = JSON.parse(process.env.GOOGLE_CLOUD_KEYFILE);
const databaseURL = process.env.FIREBASE_DATABASE_URL;

const initializeFirestoreAndAuth = () => {
  try {
    // Initialize Firebase Admin SDK
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey),
      databaseURL: databaseURL
    });

    // Initialize Firestore
    const db = admin.firestore();

    return { db, admin };
  } catch (error) {
    console.error('Error initializing Firestore and Firebase Admin:', error);
    throw error;
  }
};

module.exports = initializeFirestoreAndAuth();