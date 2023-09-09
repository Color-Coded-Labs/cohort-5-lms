import mongoose from 'mongoose';
const { Schema } = mongoose;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
