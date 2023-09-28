import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleAddModuleButton } from "../pages/Dashboard";

const Navbar = ({ isLoggedIn, isDashboard }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (userLoggedIn) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUserLoggedIn(false);
      navigate("/");
    }
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
        <Link className="btn btn-ghost normal-case text-xl">
          Color Coded Labs
        </Link>
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
    </div>
  );
};

export default Navbar;
