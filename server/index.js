// Load required modules
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRoutes.js";
import topicRoute from "./routes/topicRoutes.js";
import courseRoute from "./routes/courseRoutes.js";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swaggerConfig.js"; // Replace with the actual path to your Swagger config file

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Set PORT value from environment variable or default to 8080
const PORT = process.env.PORT || 8080;

// Use JSON middleware to parse JSON request bodies
app.use(express.json());

// Middleware for handling CORS policy
app.use(cors());

// Serve Swagger documentation at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Welcome to CCL!");
});

app.use("/users", userRoute);
app.use("/courses", courseRoute);
app.use("/topics", topicRoute);

// Connect to MongoDB Atlas Database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    // Start the Express server
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
