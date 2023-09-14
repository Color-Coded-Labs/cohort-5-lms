import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/signup",
        {
          username,
          password,
        }
      );
      console.log(response.data)
      if (response.status === 200) {
        navigate.push("/login");
      }
    } catch (error) {
      console.log("Signup error", error);
    }
  };

  return (

    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <div className="bg-white p-3 rounded" style={{ width: '40%' }}>
          <h2 className='mb-3 text-primary'>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div >
              <label className="form-label">
                <strong>Username</strong>
              </label>
              <input
                type="username"
                placeholder="Enter Username"
                className="form-control"
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>
            <div>
              <label className="form-label">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ color: 'red' }}>Register</button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Signup
