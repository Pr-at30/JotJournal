import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-64 flex flex-col items-center space-y-4">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    </div>
  );
};

export default Loading;
