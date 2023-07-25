import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";
import Loading from "../components/Loading";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const URL = process.env.REACT_APP_BACKEND_URL;


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/api/auth/login`, {
        username,
        password,
      });
      const token = response.data.token;
      const user = response.data.username;
      // Store the token and user data in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("username", JSON.stringify(user));

      window.location.href = "/";
    } catch (error) {
      setMessage(error.response.data.message);
      console.log(error.response);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const token = JSON.parse(localStorage.getItem("token"));


  if (token !== undefined && token !== null) {
    window.location.href = "/";
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-64 flex flex-col items-center space-y-4">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block mb-1">
              Username:
            </label>
            <input
              type="username"
              id="username"
              className="w-full border border-gray-300 px-3 py-2 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 px-3 py-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {message && <div className="text-error text-sm">{message}</div>}
          {/* Don't have an account? */}
          <div className="flex items-center justify-between">
            New here ?
            <Link to="/register" className="text-primary hover:text-accent">
              Register
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-accent text-base-100 py-2 rounded"
          >
            Login
          </button>
        </form>
        <Modal />
      </div>
    </div>
  );
};

export default LoginPage;
