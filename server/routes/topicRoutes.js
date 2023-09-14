import express from "express";
import Course from "../models/courseModel.js";

const router = express.Router();

// ===================== Topic Routes =====================

// Route for creating a new Topic
router.post("/create", async (req, res) => {
  // TODO: Implement topic creation logic
  try {
    const { courseName, title, content } = req.body;
    const course = await Course.findOne({ name: courseName });
    if (!course) {
      res.status(404).json({
        message: "Course not found",
      });
    }
    const topic = { title, content };
    course.topics.push(topic);
    await course.save();
    res.status(200).send("Topic added successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to GET all Topics from database
router.get("/", async (req, res) => {
  // TODO: Implement fetch specific topic logic
  try {
    const courses = await Course.find();
    const allTopics = [];

    for (let cor of courses) {
      const topics = cor.topics.map((topic) => ({
        topicId: topic._id,
        title: topic.title,
      }));

      allTopics.push(...topics);
    }
    res.status(200).json(allTopics);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to GET one Topic from database
router.get("/:topicId", async (req, res) => {
  // TODO: Implement fetch specific topic logic
  try {
    const courses = await Course.find();
    for (let cor of courses) {
      const topic = cor.topics.id(req.params.topicId);
      if (topic) {
        res.status(200).json(topic);
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to UPDATE a Topic
router.put("/:courseId/:topicId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const topicId = req.params.topicId;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const topic = course.topics.id(topicId);

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    // Update the topic properties
    topic.title = req.body.title;
    topic.description = req.body.description;

    await course.save();

    res.status(200).json({ message: "Topic updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Route to DELETE a Topic
router.delete("/:courseId/:topicId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const topicId = req.params.topicId;

    // Fetch the course based on the courseId
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Find and remove the topic within the course's topics array
    course.topics.pull({ _id: topicId }); // Use the `pull` method

    // Save the course to persist the changes
    await course.save();

    res.status(200).json({ message: "Topic successfully deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
