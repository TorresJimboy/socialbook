import React, { useState } from "react";
import { Post } from "../data/posts";
import { users } from "../data/users";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const author = users.find((u) => u.id === post.userId);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  if (!author) return null;

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-3 overflow-hidden">
      <div className="card-body px-3 pt-3 pb-0">
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center gap-2">
            <img
              src={author.avatar}
              alt={author.name}
              className="rounded-circle"
              style={{ width: 42, height: 42, objectFit: "cover" }}
            />
            <div>
              <p className="mb-0 fw-semibold text-dark" style={{ fontSize: 15, lineHeight: 1.2 }}>
                {author.name}
              </p>
              <div className="d-flex align-items-center gap-1 text-muted" style={{ fontSize: 12 }}>
                <span>{post.timestamp}</span>
                <span>·</span>
                <i className="bi bi-globe2"></i>
              </div>
            </div>
          </div>
          <button className="btn btn-light btn-sm rounded-circle p-1" style={{ width: 36, height: 36 }}>
            <i className="bi bi-three-dots fs-5 text-dark"></i>
          </button>
        </div>

        {/* Content */}
        <p className="mb-3" style={{ fontSize: 15, lineHeight: 1.6 }}>
          {post.content}
        </p>
      </div>

      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt="post"
          style={{ width: "100%", maxHeight: 420, objectFit: "cover", cursor: "pointer" }}
        />
      )}

      <div className="card-body px-3 pt-2 pb-3">
        {/* Reaction counts */}
        <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
          <div className="d-flex align-items-center gap-1">
            <div className="d-flex">
              <span
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 20, height: 20, fontSize: 15 }}
              >
                👍
              </span>
              <span
                className="rounded-circle d-flex align-items-center justify-content-center ms-n1"
                style={{ width: 20, height: 20, fontSize: 15 }}
              >
                ❤️
              </span>
            </div>
            <span className="text-muted" style={{ fontSize: 14 }}>
              {likeCount}
            </span>
          </div>
          <div className="d-flex gap-3 text-muted" style={{ fontSize: 14 }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setShowCommentBox(!showCommentBox)}
            >
              {post.comments} comments
            </span>
            <span>{post.shares} shares</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="d-flex justify-content-around">
          <button
            className={`btn btn-sm d-flex align-items-center gap-2 rounded-3 px-3 py-2 ${liked ? "text-primary" : "text-dark"}`}
            style={{ fontSize: 14 }}
            onClick={handleLike}
          >
            <i className={`bi ${liked ? "bi-hand-thumbs-up-fill text-primary" : "bi-hand-thumbs-up"} fs-5`}></i>
            <span className="fw-semibold">Like</span>
          </button>
          <button
            className="btn btn-sm d-flex align-items-center gap-2 rounded-3 px-3 py-2 text-dark"
            style={{ fontSize: 14 }}
            onClick={() => setShowCommentBox(!showCommentBox)}
          >
            <i className="bi bi-chat fs-5"></i>
            <span className="fw-semibold">Comment</span>
          </button>
          <button
            className="btn btn-sm d-flex align-items-center gap-2 rounded-3 px-3 py-2 text-dark"
            style={{ fontSize: 14 }}
          >
            <i className="bi bi-share fs-5"></i>
            <span className="fw-semibold">Share</span>
          </button>
        </div>

        {/* Comment box */}
        {showCommentBox && (
          <div className="d-flex align-items-center gap-2 mt-3">
            <img
              src="https://i.pravatar.cc/150?img=68"
              alt="you"
              className="rounded-circle"
              style={{ width: 32, height: 32, objectFit: "cover", flexShrink: 0 }}
            />
            <input
              type="text"
              className="form-control rounded-pill border-0 bg-light"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ fontSize: 14, padding: "8px 14px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
