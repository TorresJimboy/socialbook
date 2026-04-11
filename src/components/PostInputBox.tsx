import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getDisplayAvatar, getDisplayName } from "../lib/profile";

interface PostInputBoxProps {
  onPost?: (post: {
    content: string;
    mediaUrl?: string;
    mediaType?: "image" | "video";
    mediaFile?: File;
    feeling?: string;
  }) => void;
}

const PostInputBox: React.FC<PostInputBoxProps> = ({ onPost }) => {
  const [value, setValue] = useState("");
  const [feeling, setFeeling] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState<"image" | "video" | undefined>();
  const [mediaFile, setMediaFile] = useState<File | undefined>();
  const [showFeelingModal, setShowFeelingModal] = useState(false);
  const { user, profile } = useAuth();
  const displayName = getDisplayName(profile, user);
  const displayAvatar = getDisplayAvatar(profile);
  const feelingOptions = [
    "happy",
    "excited",
    "grateful",
    "blessed",
    "proud",
    "relaxed",
  ];
  const activityOptions = [
    "celebrating",
    "watching a movie",
    "travelling",
    "working out",
    "eating",
    "coding",
  ];

  const handlePost = () => {
    if ((value.trim() || mediaUrl) && onPost) {
      onPost({
        content: value.trim(),
        mediaUrl: mediaUrl || undefined,
        mediaType,
        mediaFile,
        feeling: feeling.trim() || undefined,
      });
      setValue("");
      setFeeling("");
      setMediaUrl("");
      setMediaType(undefined);
      setMediaFile(undefined);
      setShowFeelingModal(false);
    }
  };

  const handleMediaChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const nextType = file.type.startsWith("video/") ? "video" : "image";

    try {
      if (mediaUrl) {
        URL.revokeObjectURL(mediaUrl);
      }

      const nextMediaUrl = URL.createObjectURL(file);
      setMediaUrl(nextMediaUrl);
      setMediaType(nextType);
      setMediaFile(file);
    } catch (error) {
      console.error("Failed to load selected media:", error);
    } finally {
      event.target.value = "";
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-3">
      <div className="card-body px-3 py-3">
        <div className="d-flex align-items-center gap-3 mb-3">
          <img
            src={displayAvatar}
            alt={displayName}
            className="rounded-circle"
            style={{ width: 40, height: 40, objectFit: "cover", flexShrink: 0 }}
          />
          <input
            type="text"
            className="form-control rounded-pill border-0 bg-light"
            placeholder={`What's on your mind, ${displayName.split(" ")[0]}?`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePost()}
            style={{ fontSize: 15, padding: "10px 16px" }}
          />
        </div>
        <div className="d-flex flex-column gap-2 mb-3">
          {feeling && (
            <div className="bg-light rounded-3 px-3 py-2 d-flex align-items-center justify-content-between">
              <span className="text-dark" style={{ fontSize: 14 }}>
                Feeling/activity: <strong>{feeling}</strong>
              </span>
              <button
                type="button"
                className="btn btn-sm text-muted p-0"
                onClick={() => setFeeling("")}
              >
                Clear
              </button>
            </div>
          )}
          {mediaUrl && (
            <div className="position-relative rounded-4 overflow-hidden border">
              {mediaType === "video" ? (
                <video
                  src={mediaUrl}
                  controls
                  style={{ width: "100%", maxHeight: 340, objectFit: "cover" }}
                />
              ) : (
                <img
                  src={mediaUrl}
                  alt="Selected post media"
                  style={{ width: "100%", maxHeight: 340, objectFit: "cover" }}
                />
              )}
              <button
                type="button"
                className="btn btn-dark btn-sm position-absolute top-0 end-0 m-2"
                onClick={() => {
                  if (mediaUrl) {
                    URL.revokeObjectURL(mediaUrl);
                  }
                  setMediaUrl("");
                  setMediaType(undefined);
                  setMediaFile(undefined);
                }}
              >
                Remove
              </button>
            </div>
          )}
        </div>
        <hr className="my-2" />
        <div className="d-flex flex-wrap justify-content-between gap-2">
          <label className="btn btn-light d-flex align-items-center justify-content-center gap-2 rounded-3 px-2 px-md-3 py-2 flex-fill">
            <i className="bi bi-camera-video-fill text-danger fs-6 fs-md-5"></i>
            <span className="fw-semibold text-dark d-none d-md-inline" style={{ fontSize: 14 }}>
              Add Video
            </span>
            <input
              type="file"
              accept="video/*"
              className="d-none"
              onChange={handleMediaChange}
            />
          </label>

          <label className="btn btn-light d-flex align-items-center justify-content-center gap-2 rounded-3 px-2 px-md-3 py-2 flex-fill">
            <i className="bi bi-image-fill text-success fs-6 fs-md-5"></i>
            <span className="fw-semibold text-dark d-none d-md-inline" style={{ fontSize: 14 }}>
              Photo/Video
            </span>
            <input
              type="file"
              accept="image/*,video/*"
              className="d-none"
              onChange={handleMediaChange}
            />
          </label>

          <button
            type="button"
            className="btn btn-light d-flex align-items-center justify-content-center gap-2 rounded-3 px-2 px-md-3 py-2 flex-fill"
            onClick={() => setShowFeelingModal(true)}
          >
            <i className="bi bi-emoji-smile-fill text-warning fs-6 fs-md-5"></i>
            <span className="fw-semibold text-dark d-none d-md-inline" style={{ fontSize: 14 }}>
              Feeling/Activity
            </span>
          </button>
        </div>
        <button
          type="button"
          className="btn btn-primary w-100 fw-semibold rounded-3 mt-3"
          disabled={!value.trim() && !mediaUrl}
          onClick={handlePost}
        >
          Post
        </button>
      </div>
      {showFeelingModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: "rgba(0, 0, 0, 0.45)", zIndex: 1080 }}
          onClick={() => setShowFeelingModal(false)}
        >
          <div
            className="bg-white rounded-4 shadow p-4"
            style={{ width: "min(92vw, 520px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h5 className="fw-bold mb-1">Choose a feeling or activity</h5>
                <p className="text-muted mb-0" style={{ fontSize: 14 }}>
                  Pick one to show with your post.
                </p>
              </div>
              <button
                type="button"
                className="btn btn-light rounded-circle"
                style={{ width: 36, height: 36 }}
                onClick={() => setShowFeelingModal(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="mb-3">
              <p className="fw-semibold text-dark mb-2">Feelings</p>
              <div className="d-flex flex-wrap gap-2">
                {feelingOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`btn rounded-pill px-3 ${
                      feeling === option ? "btn-primary" : "btn-light"
                    }`}
                    onClick={() => {
                      setFeeling(option);
                      setShowFeelingModal(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="fw-semibold text-dark mb-2">Activities</p>
              <div className="d-flex flex-wrap gap-2">
                {activityOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`btn rounded-pill px-3 ${
                      feeling === option ? "btn-primary" : "btn-light"
                    }`}
                    onClick={() => {
                      setFeeling(option);
                      setShowFeelingModal(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostInputBox;
