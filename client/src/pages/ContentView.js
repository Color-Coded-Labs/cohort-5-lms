import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import ReactMarkdown from "react-markdown";

function ContentView() {
  const { topicId } = useParams();
  const [topic, setTopic] = useState({ title: "", content: "" });
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    // Fetch the topic's details based on topicId
    async function fetchTopicDetails() {
      try {
        const response = await axios.get(`/topics/${topicId}`);
        setTopic(response.data);
        setEditedContent(response.data.content);
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
    // Reset edited content to the original content
    setEditedContent(topic.content);
  };

  const handleSaveEdit = async () => {
    try {
      // Send the updated content to the server
      await axios.put(`/topics/${topicId}`, { content: editedContent });
      setEditMode(false);
      // Update the topic's content
      setTopic((prevTopic) => ({ ...prevTopic, content: editedContent }));
    } catch (error) {
      console.error("Error saving edited content:", error);
    }
  };

  return (
    <>
      <Navbar isLoggedIn={true} isDashboard={false} />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold">{topic.title}</h1>
        <div className="mb-4 flex justify-between items-center"></div>
        <div className="mt-4">
          {editMode ? (
            <textarea
              className="w-full h-48 border rounded p-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          ) : (
            <ReactMarkdown className="prose max-w-none w-full h-48 p-2">
              {topic.content}
            </ReactMarkdown>
          )}
        </div>
        <div className="space-x-2">
          {editMode ? (
            <>
              <button className="btn btn-primary" onClick={handleSaveEdit}>
                Save
              </button>
              <button className="btn btn-secondary" onClick={handleCancelEdit}>
                Cancel
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={handleEditClick}>
              Edit
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default ContentView;
