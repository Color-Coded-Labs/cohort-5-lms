import express from "express";
// import { User } from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Import the User model
import User from "../models/userModel.js";
// const User = require("./models/User");

// ===================== User Routes =====================

// Route to CREATE a User
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for User to Login
router.post("/login", async (req, res) => {
  // TODO: Implement user login logic

  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ message: "Invalid username or password" });
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json({ message: "Invalid username or password" });
    }
    res
      .status(200)
      .json({ message: "Logged in successfully", userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to UPDATE a User
router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Send both username and password" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user with the hashed password
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Route to DELETE a User
router.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await User.findByIdAndDelete(userId);

    if (!result) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Route to GET all Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
