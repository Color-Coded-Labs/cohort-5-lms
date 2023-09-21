import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,

  },
  description: {
    type: String,

  },
  content: {
    type: String,

  },
  resources: [],
});

export default topicSchema;
