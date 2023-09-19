import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <>
      <div className="navbar bg-primary text-primary-content">
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>

      </div>
      <h1>Welcome to the LMS!</h1>
      <button className="btn btn-outline btn-primary">whatever</button>
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
      </ul>
    </>
  );
}

export default Welcome;
