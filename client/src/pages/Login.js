import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  function handleUsername(e) {
    setUsername(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }


  async function handleSubmit() {
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
  }

  return (
    <div>
      <h1>Login!</h1>
      <form>
        <label>Username</label>
        <input type="text" onChange={handleUsername}>Username</input>
        <label>Password</label>
        <input type="text" onChange={handlePassword}>Password</input>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
} gg

export default Login;
