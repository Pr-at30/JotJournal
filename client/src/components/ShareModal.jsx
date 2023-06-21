import React from "react";

const Modal = ({ url }) => {
  return (
    <>
      {/* Open the modal using ID.showModal() method */}
      <button className="btn" onClick={() => window.my_modal_5.showModal()}>
        Share
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box bg-neutral-200">
          <div className="modal-header">
            <h2 className="text-2xl font-bold">Sharing is caring</h2>
          </div>
          <div className="modal-body mt-4">
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
              <a
                href={`https://wa.me/?text=${url}`}
                target="_blank"
                rel="noreferrer"
              >
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
              {/* Share by copying the link to clipboard */}
            </div>
            <div className="flex flex-row items-center justify-between align-middle mt-4">
              <input
                type="text"
                className="input input-bordered w-3/4 rounded-md p-2 bg-neutral-100 focus:bg-neutral-200"
                value={url}
                readOnly
              />
              <button
                className="btn btn-sm sm:btn-md bg-accent"
                onClick={() => {
                  navigator.clipboard.writeText(url);
                }}
              >
                Copy
              </button>
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
