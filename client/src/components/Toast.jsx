import React from "react";

const Toast = ({msg}) => {
  return (
    <div className="toast">
      <div className="alert alert-info">
        <span>{msg}</span>
      </div>
    </div>
  );
};

export default Toast;
