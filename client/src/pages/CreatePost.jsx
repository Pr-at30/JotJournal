import { React, useEffect, useState } from "react";
import Editor from "../components/Editor";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Loading from "../components/Loading";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const URL = process.env.REACT_APP_BACKEND_URL;

  const token = localStorage.getItem("token");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  
  if (token === undefined || token === null) {
    window.location.href = "/";
  }

  if (loading) {
    return <Loading />;
  }

  const createNewPost = (e) => {
    e.preventDefault();

    if (!title || !summary || !content || !files) {
      setMessage("Please fill all fields");
      return;
    }

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    axios
      .post(`${URL}/api/post`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 mx-5 min-w-xl border max-w-xl mt-20 bg-base-200 rounded-md sm:mx-auto border-neutral">
      <form
        onSubmit={createNewPost}
        className="flex flex-col items-center justify-center -mt-2̥0 "
      >
        <div className="text-xl font-bold mb-5 text-center">Create Post</div>
        <input
          type="title"
          placeholder="Title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          className="block mb-5 w-full px-5 py-3 border-2 rounded focus:border-primary focus:outline-none"
        />
        <input
          type="summary"
          placeholder="Add tags seperated by space"
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
          className="block mb-5 w-full px-5 py-3 border-2 focus:border-primary focus:outline-none"
        />
        <input
          type="file"
          onChange={(ev) => setFiles(ev.target.files)}
          className="block mb-5 w-full px-5 py-3 border-2 focus:border-primary focus:outline-none"
        />
        <div className="mb-5 max-w-xl w-full">
          <Editor
            value={content}
            onChange={setContent}
            className="p-10 mb-12 rounded-sm text-base-100 "
          />
        </div>
        {message && <div className="text-error text-sm mb-5">{message}</div>}

        <button
          style={{ marginTop: "5px" }}
          className="cursor-pointer w-full block bg-primary border-0 text-base-100 rounded py-3 px-0"
        >
          Create post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
