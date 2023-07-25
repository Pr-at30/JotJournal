import React, { useEffect, useState } from "react";
import Editor from "../components/Editor";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

const EditPost = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [message, setMessage] = useState("");

  const URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${URL}/api/post/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setTitle(res.data.title);
        setSummary(res.data.summary);
        setContent(res.data.content);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [URL, id]);

  const editPost = (e) => {
    e.preventDefault();
    if (!title || !summary || !content) {
      setMessage("Please fill all fields");
      return;
    }

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    axios
      .patch(`${URL}/api/post/edit/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        // Go to the updated post
        window.location.href = `/post/${id}`;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [loading, setLoading] = useState(true);


  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center p-5 mx-5 min-w-xl border max-w-xl mt-20 bg-base-200 rounded-md sm:mx-auto border-neutral">
      <form
        onSubmit={editPost}
        className="flex flex-col items-center justify-center -mt-2̥0 "
      >
        <div className="text-xl font-bold mb-5 text-center">Edit Post</div>
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
          className="block mb-5 w-full px-5 py-3 border-2 focus:border-primary focus:outline-none overflow-auto"
        />
        <input
          type="file"
          onChange={(ev) => setFiles(ev.target.files)}
          className="block mb-5 w-full px-5 py-3 border-2 focus:border-primary focus:outline-none overflow-auto"
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
          Update post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
