import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export function handleAddModuleButton() {
  document.getElementById("add_module_modal").showModal();
}

function Dashboard() {
  const [modules, setModules] = useState([]);
  // const [topics, setTopics] = useState([]);
  const [newModuleName, setNewModuleName] = useState("");
  const [newModuleDescription, setNewModuleDescription] = useState("");
  const [newTopicName, setNewTopicName] = useState("");
  const [newTopicDescription, setNewTopicDescription] = useState("");
  const [courseName, setCourseName] = useState("");
  const [editTopicName, setEditTopicName] = useState("");
  const [deleteTopicName, setDeleteTopicName] = useState("");
  const [editModuleName, setEditModuleName] = useState("");
  const [deleteModuleName, setDeleteModuleName] = useState("");

  useEffect(() => {
    const endpoint = "/courses";
    axios
      .get(endpoint)
      .then((response) => {
        console.log("API Response:", response.data);
        setModules(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses", error);
      });
  }, []);

  function handleAddTopicButton() {
    document.getElementById("add_topic_modal").showModal();
  }

  async function handleAddTopic() {
    try {
      const newTopic = {
        courseName: courseName,
        title: newTopicName,
        description: newTopicDescription,
        content: "content",
      };

      const createResponse = await axios.post("/topics/create", newTopic);

      if (createResponse.data) {
        setNewTopicName("");
        setNewTopicDescription("");
        document.getElementById("add_topic_modal").close();
        console.log("Topic added successfully!");

        axios.get("/courses").then((response) => {
          setModules(response.data);
        });
      } else {
        console.error("Error adding topic. No data received in the response.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else {
        console.error("Error adding topic:", error.message);
      }
    }
  }

  function handleEditTopicButton(moduleId, topicId) {
    setEditModuleName(moduleId);
    setEditTopicName(topicId);
    document.getElementById("edit_topic_modal").showModal();
  }

  async function handleEditTopicName() {
    try {
      const courseId = editModuleName; // Use moduleId as courseId
      const topicId = editTopicName; // Use editTopicName as topicId

      const updatedTopic = {
        title: newModuleName, // Use newModuleName for the updated title
      };

      const response = await axios.put(
        `/topics/${courseId}/${topicId}`,
        updatedTopic
      );

      if (response.status === 200) {
        console.log("Topic edited successfully");
        document.getElementById("edit_topic_modal").close();

        // Refresh data after editing a topic
        axios.get("/courses").then((response) => {
          setModules(response.data);
        });
      } else {
        console.error("Error editing topic. Status:", response.status);
      }
    } catch (error) {
      console.error("Error editing topic:", error.message);
    }
  }

  function handleDeleteTopicButton(courseId, topicId) {
    setDeleteModuleName(courseId);
    setDeleteTopicName(topicId);
    document.getElementById("delete_topic_modal").showModal();
  }

  async function handleDeleteTopic() {
    try {
      // Find the corresponding course object by name
      const courseToDelete = modules.find(
        (module) => module.title === deleteModuleName
      );

      if (!courseToDelete) {
        console.error("Course not found");
        return;
      }

      const courseId = courseToDelete._id;

      const response = await axios.delete(
        `/topics/${courseId}/${deleteTopicName}`
      );

      if (response.status === 200) {
        console.log("Topic deleted successfully");
        document.getElementById("delete_topic_modal").close();

        // Refresh data after deleting a topic
        axios.get("/courses").then((response) => {
          setModules(response.data);
        });
      } else {
        console.error("Error deleting topic. Status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting topic:", error.message);
    }
  }

  async function handleAddModule() {
    try {
      const newModule = {
        title: newModuleName,
        description: newModuleDescription,
        topics: [],
      };

      const response = await axios.post("/courses/create", newModule);

      if (response.data) {
        setModules((prevModules) => [...prevModules, response.data]);
        document.getElementById("add_module_modal").close();
        setNewModuleName("");
        setNewModuleDescription("");
      } else {
        console.error("Error adding module. No data received in the response.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else {
        console.error("Error adding module:", error.message);
      }
    }
  }

  function handleEditModuleButton(moduleId) {
    document.getElementById("edit_module_modal").showModal();
    setEditModuleName(moduleId);
  }

  async function handleEditModuleName() {
    try {
      const updatedModule = {
        title: newModuleName,
        description: newModuleDescription,
      };

      const response = await axios.put(
        `/courses/${editModuleName}`,
        updatedModule
      );

      if (response.data) {
        setModules((prevModules) =>
          prevModules.map((module) =>
            module._id === editModuleName ? response.data : module
          )
        );
        document.getElementById("edit_module_modal").close();

        // Refresh data after editing a module
        axios.get("/courses").then((response) => {
          setModules(response.data);
        });
      } else {
        console.error(
          "Error editing module. No data received in the response."
        );
      }
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else {
        console.error("Error editing module:", error.message);
      }
    }
  }

  function handleDeleteModuleButton(moduleId) {
    document.getElementById("delete_module_modal").showModal();
    setDeleteModuleName(moduleId);
  }

  async function handleDeleteModule() {
    try {
      let response = await axios.delete(`/courses/${deleteModuleName}`);
      if (response.data) {
        setModules((prevModules) =>
          prevModules.filter((module) => module._id !== deleteModuleName)
        );
        document.getElementById("delete_module_modal").close();
      }
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  }

  return (
    <>
      <Navbar isLoggedIn={true} isDashboard={true} />

      <div
        className="dashboard "
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {modules.length > 0 ? (
          modules.map((module) => (
            <div
              key={module._id}
              className="card w-1200 bg-base-100 shadow-xl mt-10"
            >
              <div
                className="card-body"
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div className="flex flex-col">
                      <h2 className="card-title">{module.title}</h2>
                      <p>{module.description}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "5px",
                      }}
                    >
                      <button
                        className="btn"
                        onClick={() => {
                          setCourseName(module.title);
                          handleAddTopicButton();
                        }}
                      >
                        Add Topic
                      </button>
                      <button
                        className="btn"
                        onClick={() => handleEditModuleButton(module._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn"
                        onClick={() => handleDeleteModuleButton(module._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <ul className="menu w-1200 bg-base-200  rounded-box">
                <li>
                  <h2 className="menu-title">Topics</h2>
                  <ul>
                    {module?.topics?.map((topic) => (
                      <li
                        key={topic._id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "800px",
                        }}
                      >
                        <div style={{ justifyContent: "space-between" }}>
                          <div>
                            <Link to={`/topics/${module._id}/${topic._id}`}>
                              {topic.title}
                            </Link>
                          </div>
                          <div style={{ display: "flex", gap: "5px" }}>
                            <button
                              className="btn"
                              onClick={() =>
                                handleEditTopicButton(module._id, topic._id)
                              }
                            >
                              Edit
                            </button>

                            <button
                              className="btn"
                              onClick={() =>
                                handleDeleteTopicButton(module.title, topic._id)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          ))
        ) : (
          <p>No modules available.</p>
        )}
      </div>

      {/* Add Module Modal */}
      <dialog id="add_module_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Module</h3>
          <input
            className="input input-bordered w-full mb-2"
            type="text"
            placeholder="Module Name"
            value={newModuleName}
            onChange={(e) => setNewModuleName(e.target.value)}
          />
          <input
            className="input input-bordered w-full mb-2"
            type="text"
            placeholder="Module Description"
            value={newModuleDescription}
            onChange={(e) => setNewModuleDescription(e.target.value)}
          />
          <div className="modal-action">
            <button className="btn" onClick={handleAddModule}>
              Add
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                document.getElementById("add_module_modal").close();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      {/* Add Topic Modal */}
      <dialog id="add_topic_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Topic</h3>
          <input
            className="input input-bordered w-full mb-2"
            type="text"
            placeholder="Topic Name"
            value={newTopicName}
            onChange={(e) => setNewTopicName(e.target.value)}
          />
          <div className="modal-action">
            <button className="btn" onClick={handleAddTopic}>
              Add
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                document.getElementById("add_topic_modal").close();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
      {/* Edit Module Modal */}
      <dialog id="edit_module_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Module</h3>
          <input
            className="input input-bordered w-full mb-2"
            type="text"
            placeholder="Module Name"
            value={newModuleName}
            onChange={(e) => setNewModuleName(e.target.value)}
          />
          <input
            className="input input-bordered w-full mb-2"
            type="text"
            placeholder="Module Description"
            value={newModuleDescription}
            onChange={(e) => setNewModuleDescription(e.target.value)}
          />
          <div className="modal-action">
            <button className="btn" onClick={handleEditModuleName}>
              Edit
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                document.getElementById("edit_module_modal").close();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      {/* Edit Topic Modal */}
      <dialog id="edit_topic_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Topic</h3>
          <input
            className="input input-bordered w-full mb-2"
            type="text"
            placeholder="Topic Name"
            value={editTopicName.title}
            onChange={(e) => setEditTopicName(e.target.value)}
          />
          <div className="modal-action">
            <button className="btn" onClick={handleEditTopicName}>
              Edit
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                document.getElementById("edit_topic_modal").close();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      {/* Delete Module Modal */}
      <dialog id="delete_module_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Module</h3>
          <div className="modal-action">
            <button className="btn" onClick={handleDeleteModule}>
              Delete
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                document.getElementById("delete_module_modal").close();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      {/* Delete Topic Modal */}
      <dialog id="delete_topic_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Topic</h3>
          <div className="modal-action">
            <button className="btn" onClick={handleDeleteTopic}>
              Delete
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                document.getElementById("delete_topic_modal").close();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Dashboard;
