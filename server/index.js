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

app.post("", async (req, res) => {
  app.post('/register', async (req, res) => {
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
        password: hashedPassword
      });
  
      await newUser.save();
  
      res.status(200).json({ message: "User registered successfully" });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // TODO: Implement user signup logic
});

app.post("", async (req, res) => {
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

  // TODO: Implement user login logic
});

app.put("", async (req, res) => {
  // TODO: Implement user update logic
});

app.delete("/user/:userId", async (req, res) => {
  // TODO: Implement user deletion logic
  try {
    const { userId } = req.params.userId;
    const result = await User.findByIdAndDelete(userId);
  
  res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


    

    //delete user
    

  // TODO: Implement user deletion logic


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
