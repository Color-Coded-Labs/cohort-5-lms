import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export function handleAddModuleButton() {
  document.getElementById("add_module_modal").showModal();
}

function Dashboard() {
  const [modules, setModules] = useState([]);
  const [newModuleName, setNewModuleName] = useState("");
  const [newModuleDescription, setNewModuleDescription] = useState("");
  const [newTopicName, setNewTopicName] = useState("");
  const [newTopicDescription, setNewTopicDescription] = useState("");
  const [courseName, setCourseName] = useState("");
  const [editTopicName, setEditTopicName] = useState("");
  const [editTopicId, setEditTopicId] = useState("");
  const [editModuleId, setEditModuleId] = useState("");
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
    setEditModuleId(moduleId);
    setEditTopicId(topicId);
    document.getElementById("edit_topic_modal").showModal();
  }

  async function handleEditTopicName() {
    try {
      const updatedTopic = {
        title: editTopicName,
      };

      const response = await axios.put(
        `/topics/${editModuleId}/${editTopicId}`,
        updatedTopic
      );

      if (response.status === 200) {
        console.log("Topic edited successfully");
        document.getElementById("edit_topic_modal").close();

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

      <div className="dashboard  mx-auto p-4  max-w-6xl 2justify-center items-center min-h-screen">
        <div className="">
          {modules.length > 0 ? (
            modules.map((module) => (
              <div key={module._id} className="card    shadow-xl mb-6 ">
                <div className="card-body flex flex-row ">
                  <div className="justify-between w-full">
                    <div className="flex  items-center justify-between">
                      <div className="flex flex-col">
                        <h3 className="card-title">{module.title}</h3>
                        <p>{module.description}</p>
                      </div>
                      <div className="flex flex-row items-end space-x-2 basis-1/4 ">
                        <button
                          className="btn btn-outline btn-primary"
                          onClick={() => {
                            setCourseName(module.title);
                            handleAddTopicButton();
                          }}
                        >
                          Add Topic
                        </button>
                        <button
                          className="btn btn-outline btn-accent"
                          onClick={() => {
                            setNewModuleName(module.title);
                            setNewModuleDescription(module.description);
                            handleEditModuleButton(module._id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline btn-secondary"
                          onClick={() => handleDeleteModuleButton(module._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <ul className="menu  bg-base-200  rounded-b-lg">
                  <li>
                    <h2 className="menu-title">Topics</h2>
                    <ul>
                      {module?.topics?.map((topic) => (
                        <li key={topic._id}>
                          <div className="flex justify-between w-full ">
                            <Link to={`/topics/${module._id}/${topic._id}`}>
                              {topic.title}
                            </Link>

                            <div className="flex space-x-2 ">
                              <button
                                className="btn btn-outline btn-accent"
                                onClick={() => {
                                  setEditTopicName(topic.title);
                                  handleEditTopicButton(module._id, topic._id);
                                }}
                              >
                                Edit
                              </button>

                              <button
                                className="btn btn-outline btn-secondary"
                                onClick={() =>
                                  handleDeleteTopicButton(
                                    module.title,
                                    topic._id
                                  )
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
