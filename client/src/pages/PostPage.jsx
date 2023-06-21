import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatISO9075 } from "date-fns";
import PageNotFound from "./PageNotFound";
import { AiOutlineEdit } from "react-icons/ai";
import Loading from "../components/Loading";
import ShareModal from "../components/ShareModal";

const PostPage = () => {
  const { id } = useParams();

  const [post, setPost] = useState({});

  const URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${URL}/api/post/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => console.log(err));
  }, [id, URL]);

  const { title, createdAt, summary, content, cover } = post;


  // Checks if the content of the post has code blocks and add a class to the pre tag
  useEffect(() => {
    const preTags = document.querySelectorAll("pre");
    preTags.forEach((tag) => {
      tag.classList.add(
        "rounded-md",
        "p-4",
        "bg-neutral",
        "text-neutral-content",
        "font-mono",
        "overflow-x-auto",
        "shadow-md"
      );
    });
    setLoading(false);
  }, [content]);

  const imgPath = `${URL}/${cover}`;

  const author = post.author ? post.author.username : "Anonymous";
  const user = JSON.parse(localStorage.getItem("username"));

  // Delete post
  const handleDelete = (id) => {
    axios
      .delete(`${URL}/api/post/delete/${id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        window.location.href = "/";
      })
      .catch((err) => console.log(err));
  };

  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loading />;
  }

  if (!post) return <PageNotFound />;

  return (
    <>
      {post && (
        <div className="max-w-4xl mx-auto p-4 ">
          <img
            src={imgPath}
            alt="Cover"
            className="mb-5 rounded-md shadow-md w-1/2 mx-auto"
          />
          {user === author && (
            <div className="flex justify-center mb-5">
              <div className="flex justify-center mb-5 px-1">
                <button
                  className="btn btn-sm sm:btn-md bg-accent"
                  onClick={() => {
                    window.location.href = `/edit/${id}`;
                  }}
                >
                  Edit <AiOutlineEdit className="inline-block " />
                </button>
              </div>
              <div className="flex justify-center mb-5 px-1">
                <button
                  className="btn btn-sm sm:btn-md bg-error"
                  onClick={() => {
                    handleDelete(id);
                  }}
                >
                  Delete <AiOutlineEdit className="inline-block " />
                </button>
              </div>
            </div>
          )}
          <div className="overflow-auto">
            <div className="text-sm sm:text-lg md:text-2xl font-bold mb-2 text-center">
              {title}
            </div>
            <p className="text-gray-600 mb-2">
              By {author} | {createdAt && formatISO9075(new Date(createdAt))}
            </p>
            {/* Display tags */}
            <div className="flex flex-row items-center justify-between align-middle overflow-x-scroll mb-2">
              <div className="flex flex-wrap ">
                {summary &&
                  summary.split(" ").map((tag, index) => (
                    <div
                      key={index}
                      className="bg-neutral text-neutral-content text-sm rounded-md px-2 py-1 mr-2 "
                    >
                      {tag}
                    </div>
                  ))}
              </div>
              <ShareModal url={window.location.href} />
            </div>

            <div
              className="border border-neutral rounded-md p-4 mb-4  break-words"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PostPage;
