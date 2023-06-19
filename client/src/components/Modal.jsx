import React from "react";
import {MdOutlineContentCopy} from "react-icons/md";

const Modal = () => {
  return (
    <>
      {/* Open the modal using ID.showModal() method */}
      <button className="btn" onClick={() => window.my_modal_5.showModal()}>
        Show test credentials
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
          <div className="modal-header">
            <h2 className="text-2xl font-bold">Test Credentials</h2>
          </div>
          <div className="modal-body">
            <div className="flex justify-between items-center"> 
              <p>
                <strong>Username:</strong> test
              </p>
              <p
                className="text-sm text-neutral-content"
                onClick={() => navigator.clipboard.writeText("test")}
              >
                <MdOutlineContentCopy fontSize="20px" className="text-neutral cursor-pointer" />
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p>
                <strong>Password:</strong> test
              </p>
              <p
                className="text-sm text-neutral-content"
                onClick={() => navigator.clipboard.writeText("test")}
              >
                <MdOutlineContentCopy fontSize="20px"className="text-neutral cursor-pointer" />
              </p>
            </div>
          </div>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default Modal;
