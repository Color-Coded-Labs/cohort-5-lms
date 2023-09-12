import express from "express";
import { Course } from "../models/courseModel.js";

const router = express.Router();

// ===================== Course Routes =====================

router.post("/", async (req, res) => {
  // TODO: Implement fetch all modules logic
  try {
    if (!req.body.title || !req.body.description) {
      return res.status(400).json({
        message: "Please include a title and description",
      });
    }
    const newCourse = {
      title: req.body.title,
      description: req.body.description,
    };

    const course = await Course.create(newCourse);
    return res.status(200).send(course);
  } catch (error) {
    (error) => {
      console.log(error.message);
      res.status(500).send(message);
    };
  }
});

// Route to GET one Course from database
router.get("/:courseID", async (req, res) => {
  // TODO: Implement fetch specific topic logic
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    return res.status(200).json(course);
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

    return res.status(200).json({
      count: course.length,
      data: course,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.put("/create", async (req, res) => {
  // TODO: Implement module update logic
});

// Route to DELETE a Course
router.delete("/:courseId", async (req, res) => {
  // TODO: Implement user deletion logic
  try {
    const { courseId } = req.params.courseId;

    const result = await User.findByIdAndDelete(courseId);

    if (!result) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({ messge: "Course successfully deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
