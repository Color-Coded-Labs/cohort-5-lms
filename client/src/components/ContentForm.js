import React, { useState } from "react";
import axios from "axios";

const ContentForm = () => {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    topics: [], // Initialize topics as an empty array
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/courses/create", courseData);
      console.log("Course created:", response.data);
      // Reset the form fields if needed
      setCourseData({ title: "", description: "", topics: [] });
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  return (
    <div>
      <h2>Create a New Course</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={courseData.title}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Course Description"
          value={courseData.description}
          onChange={handleInputChange}
        />
        {/* You can add topics as an array of strings */}
        <input
          type="text"
          name="topics"
          placeholder="Topics (comma-separated)"
          value={courseData.topics.join(", ")}
          onChange={(e) => {
            const topics = e.target.value
              .split(",")
              .map((topic) => topic.trim());
            setCourseData({ ...courseData, topics });
          }}
        />
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default ContentForm;
