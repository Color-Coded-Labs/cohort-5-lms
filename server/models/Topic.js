import mongoose from "mongoose";
const { Schema } = mongoose;

const topicSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  chapters: {
    type: String,
    required: true,
  },
  resources: [
    {
      links: String,
      required: true,
    },
  ],
});

const Topic = mongoose.model("Topic", topicSchema);
export default Topic;
