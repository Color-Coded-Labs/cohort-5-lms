import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

function Welcome() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [usernameAvailabilityError, setUsernameAvailabilityError] =
    useState("");

  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckboxChange = () => {
    setIsSignup(!isSignup);
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      return; // Exit the function early if passwords don't match
    }

    // Check username availability
    try {
      const availabilityResponse = await axios.get(
        `/users/check-username/${username}`
      );

      if (!availabilityResponse.data.available) {
        // Username is not available
        setIsUsernameAvailable(false);
        setUsernameAvailabilityError("Username is already in use");
        return; // Exit the function
      }
    } catch (error) {
      console.error("Error checking username availability:", error);
      // Handle error, e.g., show a generic error message
    }

    // If passwords match and username is available, clear the error
    setPasswordMatchError("");
    setUsernameAvailabilityError(""); // Clear the error message

    try {
      const response = await axios.post("/users/register", {
        username,
        password,
        confirmPassword,
      });

      if (response.status === 200) {
        // Signup was successful, switch to login mode and display success message
        setIsSignup(false);
        setUsername("");
        setPassword("");
        setSuccessMessage("Sign up successfully! You can now log in.");
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to sign up. Please try again.");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/users/login", {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        // Redirect to the dashboard page or display a success message
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      openModal("Invalid username or password."); // Open the error modal
    }
  };

  const handleSubmit = () => {
    if (isSignup) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  // Add this inside your component, e.g., inside the useEffect hook
  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
      }, 5000); // Hide the modal after 5 seconds (adjust the delay as needed)

      // Clean up the timer when the component unmounts
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal]);

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold">
              Welcome to the Color Coded Labs LMS!
            </h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="username"
                  className="input input-bordered"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {!isUsernameAvailable && (
                <div className="text-red-500">{usernameAvailabilityError}</div>
              )}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {isSignup && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="confirm password"
                    className="input input-bordered"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              )}
              {passwordMatchError && (
                <div className="text-red-500">{passwordMatchError}</div>
              )}

              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  {isSignup ? "Signup" : "Login"}
                </button>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">
                    {isSignup ? "Already have an account?" : "Need to signup?"}
                  </span>
                  <input
                    type="checkbox"
                    checked={isSignup}
                    className="checkbox"
                    onChange={handleCheckboxChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-2 rounded shadow">
          {successMessage}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Error Modal"
        className="modal-card fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Error</h2>
            <p>{modalMessage}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Welcome;
