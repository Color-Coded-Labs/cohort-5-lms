import express from "express";
import { Course } from "../models/courseModel";

const router = express.Router();

// ===================== Topic Routes =====================

// Route for creating a new Topic
router.post("/create", async (req, res) => {
  // TODO: Implement topic creation logic
  try {
    const { courseName, title, content } = req.body;
    const course = await Course.findOne({ name: courseName });
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    const topic = { title, content };
    course.topics.push(topic);
    await course.save();
    return res.status(200).send("Topic added successfully");
  } catch (error) {
    (error) => {
      console.log(error.message);
      res.status(500).send(message);
    };
  }
});

// Route to GET all Topics from database
router.get("/", async (req, res) => {
  // TODO: Implement fetch specific topic logic

  try {
    const courses = await Course.find();
    for (let cor of courses) {
      const topic = cor.topics.id(req.params.topicId);
      if (topic) {
        return res.status(200).json(topic);
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to GET one Topic from database
router.get("", async (req, res) => {
  // TODO: Implement fetch specific topic logic
  try {
    const courses = await Course.find();
    for (let cor of courses) {
      const topic = cor.topics.id(req.params.topicId);
      if (topic) {
        return res.status(200).json(topic);
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to UPDATE a Topic
router.put("", async (req, res) => {
  // TODO: Implement user update logic
  try {
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.chapters ||
      !req.body.resources
    ) {
      return res.status(400).send({
        message: "Please include a title, description, chapters, and resources",
      });
    }

    const { topicId } = req.params;

    const result = await Topic.findByIdAndUpdate(topicId, req.body);

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Route to DELETE a Topic
router.delete("/topic/:topicId", async (req, res) => {
  // TODO: Implement user deletion logic
  try {
    const { topicId } = req.params.userId;

    const result = await User.findByIdAndDelete(topicId);

    if (!result) {
      return res.status(404).json({ message: "Topic not found" });
    }

    return res.status(200).json({ messge: "Topic successfully deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
