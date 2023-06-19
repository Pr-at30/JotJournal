import React, { useEffect } from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";

const Post = ({ _id, title, cover, content, createdAt, author, summary }) => {
  const username = author.username;
  const URL = process.env.REACT_APP_BACKEND_URL;
  const imgPath = `${URL}/${cover}`;

  // Get the first 100 characters of the content which is in markdown format and convert it to html
  var gist = content.substring(0, Math.min(200, content.length));

  // Format the date to show only the date and time ( Only hours and minutes)
  const date = new Date(createdAt);
  const formattedDate =
    formatISO9075(date).split(":").slice(0, 2).join(":") + " ";

  if (gist.length < content.length) {
    gist += "...";
  }

  const tags = summary.split(" ");

  // Calcualte the approx time to read the post
  const wordsPerMinute = 200;
  const numberOfWords = content.split(/\s/g).length;
  const minutes = numberOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);

  return (
    <div className="bg-base-200 border border-neutral rounded-md p-4 mb-4 flex flex-col md:flex-row m-4">
      <div className="md:w-1/3 md:border-r border-neutral md:pr-4  ">
        <Link to={`/post/${_id}`}>
          <img
            src={imgPath}
            alt="cover"
            className="w-full h-48 object-cover rounded-md"
          />
        </Link>
      </div>

      <div className="md:w-2/3 md:pl-4 ">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-row items-center justify-between align-middle">
            <Link to={`/post/${_id}`}>
              <h1 className="text-xl font-bold mb-2">{title}</h1>
            </Link>
            <p className="text-sm text-base-content font-bold ml-4 mb-2">
              {readTime} min read
            </p>
          </div>
          <div className="flex flex-row items-center justify-between align-middle">
            <div className="flex flex-row items-center justify-between align-middle overflow-x-scroll">
              {tags.map((tag) => (
                <div className="text-sm text-neutral-content font-bold mr-2 mb-2 bg-neutral rounded-md py-1 px-2 cursor-pointer">
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <p
            className="text-sm text-gray-600 mb-4 overflow-auto"
            dangerouslySetInnerHTML={{ __html: gist }}
          ></p>
          <div className="flex justify-between text-sm text-base-content">
            <div>{formattedDate}</div>
            <div className="flex flex-row items-center justify-between align-middle cursor-pointer">
              <CiUser className="text-sm text-base-content font-bold ml-4 mb-2" />
              <p className="text-sm text-base-content font-bold ml-4 mb-2">
                {username}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
