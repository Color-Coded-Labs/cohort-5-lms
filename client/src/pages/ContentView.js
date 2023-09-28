import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import ReactMarkdown from "react-markdown";

function ContentView() {
  const { courseId, topicId } = useParams();
  const [topic, setTopic] = useState({
    title: "",
    description: "",
    content: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    async function fetchTopicDetails() {
      try {
        const response = await axios.get(`/topics/${topicId}`);
        setTopic(response.data);
        setEditedContent(response.data.content);
        setEditedDescription(response.data.description);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching topic details:", error);
      }
    }

    fetchTopicDetails();
  }, [topicId]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedContent(topic.content);
    setEditedDescription(topic.description);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`/topics/${courseId}/${topicId}`, {
        content: editedContent,
        description: editedDescription,
      });
      setEditMode(false);
      setTopic((prevTopic) => ({
        ...prevTopic,
        content: editedContent,
        description: editedDescription,
      }));
    } catch (error) {
      console.error("Error saving edited content:", error);
    }
  };

  return (
    <>
      <Navbar isLoggedIn={true} isDashboard={false} />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold">{topic.title}</h1>

        {editMode ? (
          <>
            <input
              className="w-full border rounded p-2"
              type="text"
              placeholder="Edit Description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <textarea
              className="w-full h-96 flex-grow border rounded p-2 mt-4"
              placeholder="Edit Content"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSaveEdit}>
              Save
            </button>
            <button className="btn btn-secondary" onClick={handleCancelEdit}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-500 mt-4">{topic.description}</p>
            <ReactMarkdown className="prose max-w-none w-full flex-grow p-2">
              {topic.content}
            </ReactMarkdown>
            <button className="btn btn-primary" onClick={handleEditClick}>
              Edit
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default ContentView;
