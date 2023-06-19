import React from "react";
import {FiShare2} from "react-icons/fi";

const Sharing = ({ url }) => {
  return (
    <div className="flex flex-row items-center justify-between align-middle">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="https://img.icons8.com/color/48/000000/facebook-new.png"
          className="w-8 h-8 mr-2"
          alt="facebook"
        />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${url}`}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="https://img.icons8.com/color/48/000000/twitter--v1.png"
          className="w-8 h-8 mr-2"
          alt="twitter"
        />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="https://img.icons8.com/color/48/000000/linkedin.png"
          className="w-8 h-8 mr-2"
          alt="linkedin"
        />
      </a>
      <a href={`https://wa.me/?text=${url}`} target="_blank" rel="noreferrer">
        <img
          src="https://img.icons8.com/color/48/000000/whatsapp--v1.png"
          className="w-8 h-8 mr-2"
          alt="whatsapp"
        />
      </a>

      <a
        href={`https://www.reddit.com/submit?url=${url}`}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="https://img.icons8.com/color/48/000000/reddit.png"
          className="w-8 h-8 mr-2"
          alt="reddit"
        />
      </a>

      {/* Share by copying the link */}
      <FiShare2
        className="text-xl text-base-content cursor-pointer"
        onClick={() => {
          navigator.clipboard.writeText(url);
        }}
      />

    </div>
  );
};

export default Sharing;
