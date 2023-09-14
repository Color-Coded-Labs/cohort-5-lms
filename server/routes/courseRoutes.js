import express from "express";
import Course from "../models/courseModel.js";

const router = express.Router();

// ===================== Course Routes =====================

// Route to CREATE a Course
router.post("/create", async (req, res) => {
  // TODO: Implement fetch all modules logic
  try {
    if (!req.body.title || !req.body.description) {
      res.status(400).json({
        message: "Please include a title and description",
      });
    }
    const newCourse = {
      title: req.body.title,
      description: req.body.description,
    };

    const course = await Course.create(newCourse);
    res.status(200).send(course);
  } catch (error) {
    (error) => {
      console.log(error.message);
      res.status(500).send(message);
    };
  }
});

// Route to GET one Course from database
router.get("/:courseId", async (req, res) => {
  // TODO: Implement fetch specific topic logic
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    res.status(200).json(course);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for GET All Courses from database
router.get("/", async (req, res) => {
  // TODO: Implement fetch specific topic logic

  try {
    const course = await Course.find({});

    res.status(200).json(course);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to UPDATE a Course
router.put("/:courseId", async (req, res) => {
  // TODO: Implement module update logic
  try {
    if (!req.body.title || !req.body.description || !req.body.topics) {
      res.status(400).send({
        message: "Please include a title, description, and topics",
      });
    }

    const { courseId } = req.params;

    const result = await Course.findByIdAndUpdate(courseId, req.body);

    if (!result) {
      res.status(404).json({ message: "Course not found" });
    }

    res.status(200).send({ message: "Course updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Route to DELETE a Course
router.delete("/:courseId", async (req, res) => {
  // TODO: Implement user deletion logic
  try {
    const { courseId } = req.params;

    const result = await Course.findByIdAndDelete(courseId);

    if (!result) {
      res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ messge: "Course successfully deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
