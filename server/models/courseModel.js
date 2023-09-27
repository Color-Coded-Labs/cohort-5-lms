import mongoose from "mongoose";
import topicSchema from "./topicModel.js";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,

  },
  description: {
    type: String,
    required: true,
  },
  topics: [topicSchema],
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
