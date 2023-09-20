import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ContentForm from "../components/ContentForm.js";

const AddContent = () => {
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

  const [modules, setModules] = useState([]);

  return (
    <div>
      <ContentForm />
      <div className="dashboard">
        {modules.map((module) => (
          <div className="module" key={module._id}>
            <h2>{module.name}</h2>
            <p>{module.description}</p>
            <ul>
              {module.topics.map((topic) => (
                <li key={topic._id}>
                  <Link to={`/dashboard/${topic._id}`}>{topic.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button>Add Content Here</button>
      </div>
      );
    </div>
  );
};

export default AddContent;
