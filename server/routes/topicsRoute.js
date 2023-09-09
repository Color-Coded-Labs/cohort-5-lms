// ===================== Topic Routes =====================

import Topic from "../models/Topic";

// Route for creating a new Topic
app.post("", async (req, res) => {
  // TODO: Implement topic creation logic
  try {
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.chapters ||
      !req.body.resources
    ) {
      return res
        .status(400)
        .json({
          message:
            "Please include a title, description, chapters, and resources",
        });
    }
    const newTopic = {
      title: req.body.title,
      description: req.body.description,
      chapters: req.body.chapters,
      resources: req.body.resources,
    };

    const topic = await Topic.create(newTopic);
    return res.status(200).send(topic)
  } catch {
    (error) => {
      console.log(error);
    };
  }
});

// Route to GET all Topics from database
app.get("", async (req, res) => {
  // TODO: Implement fetch specific topic logic
});

// Route to GET one Topic from database
app.get("", async (req, res) => {
  // TODO: Implement fetch specific topic logic
});

// Route to UPDATE a Topic
app.put("", async (req, res) => {
  // TODO: Implement topic update logic
});

// Route to DELETE a Topic
app.delete("", async (req, res) => {
  // TODO: Implement topic deletion logic
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
