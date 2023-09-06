// Load required modules
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

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
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Import the User model
const User = require("./models/User");

// ===================== User Routes =====================

app.post("/user", async (req, res) => {
  // TODO: Implement user signup logic
});

app.post("user", async (req, res) => {
  // TODO: Implement user login logic
});

app.put("", async (req, res) => {
  // TODO: Implement user update logic
});

app.delete("", async (req, res) => {
  // TODO: Implement user deletion logic
});

// ===================== Module Routes =====================

app.get("", async (req, res) => {
  // TODO: Implement fetch all modules logic
});

app.post("", async (req, res) => {
  // TODO: Implement module creation logic
});

app.get("", async (req, res) => {
  // TODO: Implement fetch specific module logic
});

app.put("", async (req, res) => {
  // TODO: Implement module update logic
});

app.delete("", async (req, res) => {
  // TODO: Implement module deletion logic
});

// ===================== Topic Routes =====================

app.post("", async (req, res) => {
  // TODO: Implement topic creation logic
});

app.get("", async (req, res) => {
  // TODO: Implement fetch specific topic logic
});

app.put("", async (req, res) => {
  // TODO: Implement topic update logic
});

app.delete("", async (req, res) => {
  // TODO: Implement topic deletion logic
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
