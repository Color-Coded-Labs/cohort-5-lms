import mongoose from "mongoose";
const { Schema } = mongoose;

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  resources: {
    links: [],
    required: false,
  },
});

// const Topic = mongoose.model("Topic", topicSchema);
// export default Topic;
export default topicSchema;
