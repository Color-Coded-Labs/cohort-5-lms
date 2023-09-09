// Load required modules
import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import Course from "./models/Course";

import cors from "cors";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Set PORT value from environment variable or default to 8080
const PORT = process.env.PORT || 8080;

// Use JSON middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB Atlas Database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app
      .listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
      })
      .catch((err) => console.error(err));
  });
