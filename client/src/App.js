import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ContentView from "./pages/ContentView";
import AddContent from "./pages/AddContent";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:topicId" element={<ContentView />} />
          <Route path="" element={<AddContent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
