import express from "express";
// import { User } from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Import the User model
import User from "../models/userModel.js";
// const User = require("./models/User");

// ===================== User Routes =====================

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new user.
 *               password:
 *                 type: string
 *                 description: The password for the new user.
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Username already exists
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login as an existing user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 userId:
 *                   type: string
 *                   description: The user's ID.
 *       400:
 *         description: Invalid username or password
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Update a user's information
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The new username for the user.
 *               password:
 *                 type: string
 *                 description: The new password for the user.
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Send both username and password
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete.
 *     responses:
 *       200:
 *         description: User successfully deleted
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/models/userModel.js'
 *       404:
 *         description: No users found
 *       500:
 *         description: Internal server error
 */
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
