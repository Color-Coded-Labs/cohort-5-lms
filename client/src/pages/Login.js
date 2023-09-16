import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  function handleUsername(e) {
    setUsername(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }


  async function handleSubmit() {
    try {
      console.log("send username and password to API");
      console.log("Username:", username);
      console.log("password:", password);
      let response = await axios.post(
        "http://localhost:8080/api/users/login",

        {
          username,
          password,
        }
      );
      console.log(response.data)
      if (response.status === 200) {
        navigate("/dashboard")
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div>
      <h1>Login!</h1>
      <form>
        <label>Username</label>
        <input type="text" onChange={handleUsername}/>
        <label>Password</label>
        <input type="text" onChange={handlePassword}/>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
} 

export default Login;
