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
  max: 20, // Allow 20 requests every 5 minutes
  keyGenerator: (req) => {
    return req.ip; // Use the client's IP address as the rate limit key
  },
});

// Apply the rate limiter middleware to all routes
app.use(limiter);

// Define a route to handle GET requests to "/car/:year"
app.get('/car/:year', async (req, res) => {
  try {
    const { year } = req.params;
    const { make, model } = req.query;

    // Parse the year parameter as an integer
    const yearInt = parseInt(year, 10);

    // Construct the base Firestore query based on the provided year
    let query = db.collection("carDB").where("Year", "==", yearInt);

    // Add additional filters for make and model if provided
    if (make) {
      query = query.where("Make", "==", make);
    }
    if (model) {
      query = query.where("Model", "==", model);
    }

    // Retrieve data from Firestore and return selected fields only
    const carList = await query.get();
    const car = carList.docs.map((doc) => {
      const { Year, Make, Model } = doc.data();
      return { Year, Make, Model };
    });

    // Check if any car data is returned
    if (car.length === 0) {
      return res.status(404).send("Sorry, car isn't in the database :(");
    }

    // Send the retrieved data as a response
    res.status(200).json(data);
  } catch (error) {
    console.error('Error retrieving car data:', error);
    res.status(500).send('An error occurred while retrieving car data');
  }
});

// Export the Express app as a Firebase Cloud Function
export const api = onRequest({ maxInstances: 10 }, app);