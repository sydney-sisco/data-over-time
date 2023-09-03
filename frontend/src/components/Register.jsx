import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "wouter";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    }

    axios.post('/api/register', data)
      .then(res => {
        if (res.status === 200) {
          console.log('Registration successful');
          // Handle successful registration here,
          // you might want to redirect the user to the login page
          setLocation("/login");
        }
      });
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default Register;
