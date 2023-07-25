import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const URL = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post(`${URL}/api/auth/register`, { name, username, password })
      .then((res) => {
        console.log(res);
        // Go to login page
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err.response.data.message);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const token = localStorage.getItem("token");

  if (token !== undefined && token !== null) {
    window.location.href = "/";
  }

  if (loading) {
    return <Loading />;
  }
  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-64">
        <h1 className="text-2xl font-bold mb-6">Register</h1>
        <form
          className="space-y-4"
          onSubmit={handleSubmit}>  
          <div>
            <label htmlFor="name" className="block mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-300 px-3 py-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="username" className="block mb-1">
              Username:
            </label>
            <input
              type="text"
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
          {message && (
            <div className="text-error text-sm">{message}</div>
          )}
          {/* Already have an account? */}
          <div className="flex items-center justify-between">
            Already have an account?
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
