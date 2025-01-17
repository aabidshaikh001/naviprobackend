import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();
// Load Firebase Service Account
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Handle line breaks in private key
};

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

// Realtime Database References
const db = admin.database();
const updatesRef = db.ref("updates");
const paymentsRef = db.ref("payments");

export { updatesRef, paymentsRef };
