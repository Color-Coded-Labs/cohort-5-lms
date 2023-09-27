import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Navbar = ({ isLoggedIn, onLogout, isDashboard }) => {
  const [newModuleName, setNewModuleName] = useState("");
  const [newModuleDescription, setNewModuleDescription] = useState("");
  const [existingCourseTitles, setExistingCourseTitles] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchExistingCourseTitles();
  }, []);

  const fetchExistingCourseTitles = async () => {
    try {
      const response = await axios.get("/courses");
      const titles = response.data.map((course) => course.title);
      setExistingCourseTitles(titles);
    } catch (error) {
      console.error("Error fetching course titles:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "moduleName") {
      setNewModuleName(value);
    } else if (name === "moduleDescription") {
      setNewModuleDescription(value);
    }
  };

  const handleAddModuleButton = () => {
    document.getElementById("add_module_modal").showModal();
  };

  const handleAddModule = async () => {
    try {
      if (existingCourseTitles.includes(newModuleName)) {
        alert("A course with this title already exists.");
        return;
      }

      const newCourse = {
        title: newModuleName,
        description: newModuleDescription,
        topics: [],
      };

      const createResponse = await axios.post("/courses/create", newCourse);

      if (createResponse.data) {
        setNewModuleName("");
        setNewModuleDescription("");
        document.getElementById("add_module_modal").close();
        fetchExistingCourseTitles();
      }
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else {
        console.error("Error adding module:", error.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUserLoggedIn(false);
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
        </div>
        <a className="btn btn-ghost normal-case text-xl">Color Coded Labs</a>
      </div>
      <div className="navbar-center hidden lg:flex"></div>
      <div className="navbar-end">
        {/* Conditionally render the "Back to Dashboard" button */}
        {!isDashboard ? (
          <button className="btn" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        ) : null}
        {/* Conditionally render the "Add Module" button */}
        {isDashboard && isLoggedIn ? (
          <button className="btn" onClick={handleAddModuleButton}>
            Add Module
          </button>
        ) : null}
        {isLoggedIn ? (
          <button className="btn m-1" onClick={handleLogout}>
            LOG OUT
          </button>
        ) : null}
      </div>

      {/* Add Module Modal */}
      <dialog id="add_module_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Add New Module</h3>
          <input
            className="input input-bordered w-full mb-4"
            type="text"
            name="moduleName"
            placeholder="Module Name"
            value={newModuleName}
            onChange={handleInputChange}
          />
          <input
            className="input input-bordered w-full mb-2"
            type="text"
            name="moduleDescription"
            placeholder="Module Description"
            value={newModuleDescription}
            onChange={handleInputChange}
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
    </div>
  );
};

export default Navbar;
