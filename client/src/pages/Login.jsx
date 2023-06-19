import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";
import { UserContext } from "../UserContext";
import Loading from "../components/Loading";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const URL = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${URL}/api/auth/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        // window.location.href = "/";
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        console.log(err.response);
      });
  };

  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (userInfo.username !== undefined) {
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
