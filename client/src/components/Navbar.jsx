import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false);
  const URL = process.env.REACT_APP_BACKEND_URL;

  // Get the user info from local storage
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token !== undefined && token !== null) {
      setIsLogged(true);
    }
  }, [token]);

  const handleLogout = async () => {
    await axios.get(`${URL}/api/auth/logout`, {});
    // Remove the token and user data from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLogged(false);
    window.location.href = "/";
  };

  return (
    <nav className="flex justify-between items-center h-16 relative mx-auto px-4 shadow-md bg-base-200 font-bold ">
      <Link to="/" className="pl-3 flex hover:text-accent">
        MyBlog
      </Link>

      <div className="cursor-pointer flex ">
        {isLogged ? (
          <Link to="/create" className="px-4 hover:text-accent">
            Add Post
          </Link>
        ) : (
          <Link to="/login" className="px-4 hover:text-accent">
            Login
          </Link>
        )}

        {isLogged ? (
          <Link
            to="/"
            className="px-4 hover:text-accent"
            onClick={handleLogout}
          >
            Logout
          </Link>
        ) : (
          <Link to="/register" className="px-4 hover:text-accent">
            Register
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
