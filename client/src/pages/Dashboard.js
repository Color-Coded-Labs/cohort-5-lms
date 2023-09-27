import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [modules, setModules] = useState([]);
  const [newModuleName, setNewModuleName] = useState("");
  const [newModuleDescription, setNewModuleDescription] = useState("");
  const [newTopicName, setNewTopicName] = useState("");
  const [newTopicDescription, setNewTopicDescription] = useState("");
  const [courseName, setCourseName] = useState("");

  const [editTopicName, setEditTopicName] = useState("");
  const [topicTitles, setTopicTitles] = useState("");
  const [deleteTopicName, setDeleteTopicName] = useState("");
  const [editModuleName, setEditModuleName] = useState("");
  const [deleteModuleName, setDeleteModuleName] = useState("");

  useEffect(() => {
    const endpoint = "/courses";
    axios
      .get(endpoint)
      .then((response) => {
        setModules(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses", error);
      });
  }, []);

  function handleAddTopicButton() {
    document.getElementById("add_topic_modal").showModal();
  }
  const fetchExistingTopicTitles = async () => {
    try {
      const response = await axios.get("/topics");
      const titles = response.data.map((topic) => topic.title);
      setTopicTitles(titles);
    } catch (error) {
      console.error("Error fetching course titles:", error);
    }
  };

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
        fetchExistingTopicTitles();
        console.log("Topic added successfully!");
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

  function handleEditTopicButton() {
    document.getElementById("edit_topic_modal").showModal();
  }
  async function handleEditTopicName() {
    try {
      let response = await axios.post("/topics/:courseId/:topicId", {
        courseName: courseName,
        title: editTopicName,
        content: "content",
      });
      document.getElementById("edit_topic_modal").close();
    } catch (error) {
      console.error("Error editing topic:", error.message);
    }
  }
  function handleDeleteTopicButton() {
    document.getElementById("delete_topic_modal").showModal();
  }
  async function handleDeleteTopic() {
    try {
      let response = await axios.post("/topics/:courseId/:topicId", {
        courseName: courseName,
        title: deleteTopicName,
        content: "content",
      });
      document.getElementById("delete_topic_modal").close();
    } catch (error) {
      console.error("Error deleting topic:", error.message);
    }
  }
  function handleAddModuleButton() {
    document.getElementById("add_module_modal").showModal();
  }
  async function handleAddModule() {
    try {
      let response = await axios.post("/courses/create", {
        title: newModuleName,
        description: newModuleDescription,
      });
      if (response.data) {
        setModules((prevModules) => [...prevModules, response.data]);
        document.getElementById("add_module_modal").close();
      }
    } catch (error) {
      console.error("Error adding module:", error);
    }
  }
  function handleEditModuleButton() {
    document.getElementById("edit_module_modal").showModal();
  }
  async function handleEditModuleName(moduleId) {
    try {
      let response = await axios.put(`/courses/${moduleId}`, {
        title: newModuleName,
        description: newModuleDescription,
      });
      if (response.data) {
        setModules((prevModules) =>
          prevModules.map((module) =>
            module._id === moduleId ? response.data : module
          )
        );
        document.getElementById("edit_module_modal").close();
      }
    } catch (error) {
      console.error("Error editing module:", error);
    }
  }
  function handleDeleteModuleButton() {
    document.getElementById("delete_module_modal").showModal();
  }
  async function handleDeleteModule(moduleId) {
    try {
      let response = await axios.delete(`/courses/${moduleId}`);
      if (response.data) {
        setModules((prevModules) =>
          prevModules.filter((module) => module._id !== moduleId)
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
        {modules.map((module) => (
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
                  {module.topics.map((topic) => (
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
                          <Link to={`/dashboard/${topic._id}`}>
                            {topic.title}
                          </Link>
                        </div>
                        <div style={{ display: "flex", gap: "5px" }}>
                          <button
                            className="btn"
                            onClick={() =>
                              handleEditTopicName(topic.title, topic._id)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="btn"
                            onClick={() =>
                              handleDeleteTopic(module.topic, topic._id)
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
        ))}
      </div>

      {/* Edit Module Modal */}
      <dialog id="edit_module_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit Module</h3>
          <input
            className="input input-bordered w-full mb-4"
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

      {/* Add Topic Modal */}
      <dialog id="add_topic_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Add New Topic</h3>
          <input
            className="input input-bordered w-full mb-4"
            type="text"
            placeholder="Topic Name"
            value={newTopicName}
            onChange={(e) => setNewTopicName(e.target.value)}
          />
          <input
            className="input input-bordered w-full mb-2"
            type="text"
            placeholder="Topic Description"
            value={newTopicDescription}
            onChange={(e) => setNewTopicDescription(e.target.value)}
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

      {/* Edit Topic Modal */}
      <dialog id="edit_topic_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Topic</h3>
          <input
            className="input input-bordered w-full mb-2"
            type="text"
            placeholder="Topic Name"
            value={editTopicName}
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
