import React, { useState, useEffect } from "react";
import Post from "../components/Post";
import axios from "axios";
import Loading from "../components/Loading";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    document.title = "Home";
    axios
      .get(`${URL}/api/post`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          page: currentPage,
          pageSize: 3,
        },
      })
      .then((res) => {
        const { posts, totalPages } = res.data;
        setPosts(posts);
        setTotalPages(totalPages);
        setLoading(false);
      });
  }, [currentPage, URL]);

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex items-center justify-center my-10">
        {/* Responsive width */}
        <div className="w-full md:w-3/4 lg:w-1/2">
          {posts.length > 0 && posts.map((post) => <Post {...post} />)}
          {posts.length > 0 && (
            <div className="flex justify-center items-center mt-4">
              <div className="flex items-center justify-between px-4 w-full">
                <button
                  // If the current page is 1, then disable the prev button and bg color is gray
                  className={`bg-primary text-white font-bold py-2 px-4 rounded ${
                    currentPage === 1 && "hover:bg-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Prev
                </button>
                <button
                  className={`bg-primary text-white font-bold py-2 px-4 rounded ${
                    currentPage === totalPages &&
                    "hover:bg-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {posts.length === 0 && (
            <div className="flex border border-neutral rounded-md p-4 mb-4 justify-center items-center mt-64 text-neutral text-lg font-bold w-full ">
              No posts to show
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
