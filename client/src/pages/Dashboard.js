import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [modules, setModules] = useState([]);
  const [newModuleName, setNewModuleName] = useState("");
  const [newModuleDescription, setNewModuleDescription] = useState("");
  const [newTopicName, setNewTopicName] = useState("");
  const [courseName, setCourseName] = useState("");


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
  }, [modules]);

  function handleAddTopicButton() {
    document.getElementById("add_topic_modal").showModal();
  }

  async function handleAddTopic() {
    try {
      let response = await axios.post("/topics/create", {
        courseName: courseName,
        title: newTopicName,
        content: "content"
      })



      document.getElementById("add_topic_modal").close();


    } catch (error) {
      console.error("Error adding topic:", error.message);
    }
  }
  function handleAddModuleButton() {
    document.getElementById("add_module_modal").showModal();
  }
  async function handleAddModule() {
    try {
      let response = await axios.post("/courses/create", {
        title: newModuleName,
        description: newModuleDescription
      })


      if (response.data) {
        setModules((prevModules) => [...prevModules, response.data]);
        document.getElementById("add_module_modal").close();
      }

    } catch (error) {
      console.error("Error adding module:", error);
    }
  }

  return (
    <>
      <button className="btn" onClick={handleAddModuleButton}>Add Module</button>
      <div className="dashboard">
        {modules.map((module) => (
          <div key={module._id} className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{module.title}</h2>
              <p>{module.description}</p>
              <button className="btn" onClick={() => {
                setCourseName(module.title)
                handleAddTopicButton();

              }}>Add Topic</button>
              <button className="btn">Edit</button>
              <button className="btn">Delete</button>

              <ul className="menu bg-base-200 w-56 rounded-box">
                <li>
                  <h2 className="menu-title">Topics</h2>
                  <ul>
                    {module.topics.map((topic) => (
                      <li key={topic._id}>
                        <Link to={`/dashboard/${topic._id}`}>{topic.title}</Link>
                        <button className="btn">Edit</button>
                        <button className="btn">Delete</button>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Add Module Modal */}
      <dialog id="edit_module_modal" className="modal">
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
                document.getElementById("edit_module_modal").close();

              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>


      {/* Add Topic Modal */}
      <dialog id="edit_topic_modal" className="modal">
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
                document.getElementById("edit_topic_modal").close();
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
