import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.firebaseApiKey,
  authDomain: process.env.firebaseAuthDomain,
  projectId: process.env.firebaseProjectId,
  storageBucket: process.env.firebaseStorageBucket,
  messagingSenderId: process.env.firebaseMessagingSenderId,
  appId: process.env.firebaseAppId,
  measurementId: process.env.firebaseMeasurementId,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
