import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,

  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  resources: [],
});

export default topicSchema;
