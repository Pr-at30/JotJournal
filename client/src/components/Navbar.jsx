import { React, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext"


const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false);
  
  // user info from context
  const {userInfo, setUserInfo} = useContext(UserContext);

  const URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const checkLogged = async () => {
      const res = await axios.get(`${URL}/api/auth/profile`, {
        withCredentials: true,
      });
      if (res.data.message === "Failed to authenticate") {
        setIsLogged(false);
      } else {
        setIsLogged(res.data);
        setUserInfo(res.data);
      }
    };
    checkLogged();
  }, []);

  const handleLogout = async () => {
    await axios.get(`${URL}/api/auth/logout`, {
      withCredentials: true,
    });
    setIsLogged(false);
    setUserInfo({});
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
