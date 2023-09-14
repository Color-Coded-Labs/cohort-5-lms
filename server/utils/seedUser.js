import mongoose from "mongoose";
import User from "../models/userModel.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";

const currentFileUrl = import.meta.url;
const currentDir = dirname(fileURLToPath(currentFileUrl));

// Import the 'path' module explicitly
import * as path from "path";

const parentFolder = path.resolve(currentDir, "../");
dotenv.config({ path: path.join(parentFolder, ".env") });
// console.log(process.env.MONGO_URI);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.error(err));

const testUsers = [
  {
    username: "firefly42",
    password: "serenity",
  },
  {
    username: "cryptoNinja",
    password: "blockchain123",
  },
  {
    username: "musicMaestro",
    password: "melodyMagic",
  },
  {
    username: "gamerGalaxy",
    password: "gameOn456",
  },
  {
    username: "artisticSoul",
    password: "paintingColors",
  },
];

// Seed the database with starter data
async function seedData() {
  try {
    // First, clear the database of existing modules
    await User.deleteMany({});

    // Insert starter modules
    await User.insertMany(testUsers);

    console.log("Database seeded!");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedData();
