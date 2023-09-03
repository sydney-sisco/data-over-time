import { useState, useContext } from 'react';
import axios from "axios";
import { AuthContext } from '../AuthProvider';
import { useLocation } from "wouter";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const [location, setLocation] = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    const res = await axios.post('/api/login', data);
    if (res.status === 200) {
      console.log('Login successful');
      // setToken(res.data.token);
      // setLocation("/");
      login(res.data.token);
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
