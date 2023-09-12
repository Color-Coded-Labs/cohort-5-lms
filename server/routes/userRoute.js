import express from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();
const bcrypt = require("bcrypt");

// Import the User model
import User from "../models/User.js";
// const User = require("./models/User");

// ===================== User Routes =====================

router.post("/register", async (req, res) => {
  // TODO: Implement user signup logic
  try {
    const { username, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
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

router.post("/login", async (req, res) => {
  // TODO: Implement user login logic

  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("", async (req, res) => {
  // TODO: Implement user update logic
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({
        message: "Send all required fields: username, password",
      });
    }

    const { userId } = req.params;

    const result = await User.findByIdAndUpdate(userId, req.body);

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/user/:userId", async (req, res) => {
  // TODO: Implement user deletion logic
  try {
    const { userId } = req.params.userId;

    const result = await User.findByIdAndDelete(userId);

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ messge: "User successfully deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
