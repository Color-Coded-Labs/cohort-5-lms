import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: false,
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
