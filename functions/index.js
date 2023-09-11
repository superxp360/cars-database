import { onRequest } from "firebase-functions/v2/https";
import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import serviceAccount from './creds.js';
import rateLimit from 'express-rate-limit';

// Create an instance of the Express framework
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Create a Firestore database instance
const db = admin.firestore();

// Create a rate limiter middleware with IP-based rate limiting
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 30, // Allow 30 requests every 5 minutes
  keyGenerator: (req) => {
    return req.ip; // Use the client's IP address as the rate limit key
  },
});

// Apply the rate limiter middleware to all routes
app.use(limiter);

// Define a route to handle GET requests to "/car"
app.get('/car', async (req, res) => {
  try {
    // Retrieve data from Firebase Firestore and return selected fields only
    const carList = await db.collection("carDB").get();
    const data = carList.docs.map((doc) => {
      const { Year, Make, Model } = doc.data();
      return { Year, Make, Model };
    });

    // Send the retrieved data as a response
    res.status(200).json(data);
  } catch (error) {
    console.error('Error retrieving car data:', error);
    res.status(500).send('An error occurred while retrieving car data');
  }
});

// Export the Express app as a Firebase Cloud Function
export const api = onRequest({ maxInstances: 10 }, app);