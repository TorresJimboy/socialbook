import React, { useState } from "react";
import { currentUser } from "../data/users";

interface PostInputBoxProps {
  onPost?: (content: string) => void;
}

const PostInputBox: React.FC<PostInputBoxProps> = ({ onPost }) => {
  const [value, setValue] = useState("");

  const handlePost = () => {
    if (value.trim() && onPost) {
      onPost(value.trim());
      setValue("");
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-3">
      <div className="card-body px-3 py-3">
        <div className="d-flex align-items-center gap-3 mb-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="rounded-circle"
            style={{ width: 40, height: 40, objectFit: "cover", flexShrink: 0 }}
          />
          <input
            type="text"
            className="form-control rounded-pill border-0 bg-light"
            placeholder={`What's on your mind, ${currentUser.name.split(" ")[0]}?`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePost()}
            style={{ fontSize: 15, padding: "10px 16px" }}
          />
        </div>
        <hr className="my-2" />
        <div className="d-flex flex-wrap justify-content-between gap-2">
          <button className="btn btn-light d-flex align-items-center justify-content-center gap-2 rounded-3 px-2 px-md-3 py-2 flex-fill">
            <i className="bi bi-camera-video-fill text-danger fs-6 fs-md-5"></i>
            <span className="fw-semibold text-dark d-none d-md-inline" style={{ fontSize: 14 }}>
              Live Video
            </span>
          </button>

          <button className="btn btn-light d-flex align-items-center justify-content-center gap-2 rounded-3 px-2 px-md-3 py-2 flex-fill">
            <i className="bi bi-image-fill text-success fs-6 fs-md-5"></i>
            <span className="fw-semibold text-dark d-none d-md-inline" style={{ fontSize: 14 }}>
              Photo/Video
            </span>
          </button>

          <button className="btn btn-light d-flex align-items-center justify-content-center gap-2 rounded-3 px-2 px-md-3 py-2 flex-fill">
            <i className="bi bi-emoji-smile-fill text-warning fs-6 fs-md-5"></i>
            <span className="fw-semibold text-dark d-none d-md-inline" style={{ fontSize: 14 }}>
              Feeling/Activity
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostInputBox;
