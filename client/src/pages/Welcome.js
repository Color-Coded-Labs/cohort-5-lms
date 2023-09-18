import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <>
      <h1>Welcome to the LMS!</h1>
      <ul>
        <li>
          <Link to="/login">Go to Login Page</Link>
        </li>
        <li>
          <Link to="/signup">Go to Signup Page</Link>
        </li>
        <li>
          <Link to="/dashboard">Go to Dashboard Page</Link>
        </li>
        <li>
          <Link to="/addcontent">Add Content</Link>
        </li>
      </ul>
    </>
  );
}

export default Welcome;
