import express from "express";
import Course from "../models/courseModel.js";

const router = express.Router();

// ===================== Course Routes =====================

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management
 */

/**
 * @swagger
 * /courses/create:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the course.
 *               description:
 *                 type: string
 *                 description: The description of the course.
 *     responses:
 *       200:
 *         description: The created course
 *       400:
 *         description: Please include a title and description
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /courses/{courseId}:
 *   get:
 *     summary: Get a specific course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course to retrieve.
 *     responses:
 *       200:
 *         description: The course with the specified ID
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: A list of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The ID of the course.
 *                   title:
 *                     type: string
 *                     description: The title of the course.
 *                   description:
 *                     type: string
 *                     description: The description of the course.
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /courses/{courseId}:
 *   put:
 *     summary: Update a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title for the course.
 *               description:
 *                 type: string
 *                 description: The new description for the course.
 *               topics:
 *                 type: array
 *                 description: The array of topics in the course.
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       400:
 *         description: Please include a title, description, and topics
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /courses/{courseId}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course to delete.
 *     responses:
 *       200:
 *         description: Course successfully deleted
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */

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
