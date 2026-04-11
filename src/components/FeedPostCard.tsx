import React, { useEffect, useState } from "react";
import { Post, PostComment } from "../data/feedPosts";
import { users } from "../data/users";
import { useAuth } from "../context/AuthContext";
import { getDisplayAvatar, getDisplayName } from "../lib/profile";

interface FeedPostCardProps {
  post: Post;
  onDelete?: () => void;
  onUpdate?: (post: Post) => void;
}

const FeedPostCard: React.FC<FeedPostCardProps> = ({ post, onDelete, onUpdate }) => {
  const { user, profile } = useAuth();
  const currentAuthor = {
    id: 1,
    name: getDisplayName(profile, user),
    avatar: getDisplayAvatar(profile),
  };
  const author = post.userId === 1 ? currentAuthor : users.find((u) => u.id === post.userId);

  const [userReaction, setUserReaction] = useState<"like" | "heart" | null>(null);
  const [reactionCounts, setReactionCounts] = useState(post.reactions);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [commentItems, setCommentItems] = useState<PostComment[]>(post.commentItems);

  useEffect(() => {
    setReactionCounts(post.reactions);
    setCommentItems(post.commentItems);
    setUserReaction(post.viewerReaction ?? null);
  }, [post.reactions, post.commentItems, post.viewerReaction]);

  const applyReaction = (nextReaction: "like" | "heart") => {
    setReactionCounts((currentCounts) => {
      const nextCounts = { ...currentCounts };

      if (post.viewerReaction && post.viewerReaction !== nextReaction) {
        return currentCounts;
      }

      if (post.viewerReaction === nextReaction) {
        nextCounts[nextReaction] = Math.max(0, nextCounts[nextReaction] - 1);
        setUserReaction(null);
        onUpdate?.({
          ...post,
          reactions: nextCounts,
          viewerReaction: null,
        });
        return nextCounts;
      }

      nextCounts[nextReaction] += 1;
      setUserReaction(nextReaction);
      onUpdate?.({
        ...post,
        reactions: nextCounts,
        viewerReaction: nextReaction,
      });
      return nextCounts;
    });
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;

    const nextComment: PostComment = {
      id: Date.now(),
      userName: currentAuthor.name,
      userAvatar: currentAuthor.avatar,
      message: comment.trim(),
      timestamp: "Just now",
    };

    setCommentItems((currentComments) => {
      const nextComments = [...currentComments, nextComment];
      onUpdate?.({
        ...post,
        commentItems: nextComments,
      });
      return nextComments;
    });
    setComment("");
    setShowComments(true);
  };

  const handleDelete = () => {
    if (!onDelete) return;
    onDelete();
  };

  if (!author) return null;

  const totalReactions = reactionCounts.like + reactionCounts.heart;

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-3 overflow-hidden">
      <div className="card-body px-3 pt-3 pb-0">
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
                {post.feeling ? (
                  <span className="text-muted fw-normal"> is feeling {post.feeling}</span>
                ) : null}
              </p>
              <div className="d-flex align-items-center gap-1 text-muted" style={{ fontSize: 12 }}>
                <span>{post.timestamp}</span>
                <span>·</span>
                <i className="bi bi-globe2"></i>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center gap-1">
            <button className="btn btn-light btn-sm rounded-circle p-1" style={{ width: 36, height: 36 }}>
              <i className="bi bi-three-dots fs-5 text-dark"></i>
            </button>
            <button
              type="button"
              className="btn btn-light btn-sm rounded-circle p-1"
              style={{ width: 36, height: 36, opacity: onDelete ? 1 : 0.9 }}
              onClick={handleDelete}
              title={onDelete ? "Delete post" : "Unavailable"}
              disabled={!onDelete}
            >
              <i className="bi bi-x-lg fs-6 text-dark"></i>
            </button>
          </div>
        </div>

        {post.content && (
          <p className="mb-3" style={{ fontSize: 15, lineHeight: 1.6 }}>
            {post.content}
          </p>
        )}
      </div>

      {post.mediaUrl && post.mediaType === "video" && (
        <video
          src={post.mediaUrl}
          controls
          style={{ width: "100%", maxHeight: 420, objectFit: "cover", background: "#000" }}
        />
      )}
      {post.mediaUrl && (!post.mediaType || post.mediaType === "image") && (
        <img
          src={post.mediaUrl}
          alt="post"
          style={{ width: "100%", maxHeight: 420, objectFit: "cover", cursor: "pointer" }}
        />
      )}

      <div className="card-body px-3 pt-2 pb-3">
        <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
          <div className="d-flex align-items-center gap-2">
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
              {totalReactions}
            </span>
          </div>
          <div className="d-flex gap-3 text-muted" style={{ fontSize: 14 }}>
            <span style={{ cursor: "pointer" }} onClick={() => setShowComments((current) => !current)}>
              {commentItems.length} comments
            </span>
            <span>{post.shares} shares</span>
          </div>
        </div>

        <div className="d-flex justify-content-around flex-wrap gap-2">
          <button
            className={`btn btn-sm d-flex align-items-center gap-2 rounded-3 px-3 py-2 ${
              userReaction === "like" ? "text-primary" : "text-dark"
            }`}
            style={{ fontSize: 14 }}
            onClick={() => applyReaction("like")}
            disabled={Boolean(post.viewerReaction && post.viewerReaction !== "like")}
          >
            <i className={`bi ${userReaction === "like" ? "bi-hand-thumbs-up-fill text-primary" : "bi-hand-thumbs-up"} fs-5`}></i>
            <span className="fw-semibold">Like</span>
            <span className="text-muted">{reactionCounts.like}</span>
          </button>
          <button
            className={`btn btn-sm d-flex align-items-center gap-2 rounded-3 px-3 py-2 ${
              userReaction === "heart" ? "text-danger" : "text-dark"
            }`}
            style={{ fontSize: 14 }}
            onClick={() => applyReaction("heart")}
            disabled={Boolean(post.viewerReaction && post.viewerReaction !== "heart")}
          >
            <i className={`bi ${userReaction === "heart" ? "bi-heart-fill text-danger" : "bi-heart"} fs-5`}></i>
            <span className="fw-semibold">Heart</span>
            <span className="text-muted">{reactionCounts.heart}</span>
          </button>
          <button
            className="btn btn-sm d-flex align-items-center gap-2 rounded-3 px-3 py-2 text-dark"
            style={{ fontSize: 14 }}
            onClick={() => setShowComments((current) => !current)}
          >
            <i className="bi bi-chat fs-5"></i>
            <span className="fw-semibold">Comment</span>
          </button>
        </div>

        {showComments && (
          <div className="mt-3 pt-3 border-top">
            <div className="d-flex gap-2 flex-wrap mb-3">
              <span className="badge text-bg-light">👍 {reactionCounts.like} likes</span>
              <span className="badge text-bg-light">❤️ {reactionCounts.heart} hearts</span>
            </div>

            <div className="d-flex flex-column gap-3">
              {commentItems.map((item) => (
                <div key={item.id} className="d-flex gap-2 align-items-start">
                  <img
                    src={item.userAvatar}
                    alt={item.userName}
                    className="rounded-circle"
                    style={{ width: 32, height: 32, objectFit: "cover", flexShrink: 0 }}
                  />
                  <div className="bg-light rounded-4 px-3 py-2 flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center gap-2">
                      <span className="fw-semibold text-dark" style={{ fontSize: 14 }}>
                        {item.userName}
                      </span>
                      <span className="text-muted" style={{ fontSize: 12 }}>
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="mb-0 text-dark" style={{ fontSize: 14 }}>
                      {item.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex align-items-center gap-2 mt-3">
              <img
                src={currentAuthor.avatar}
                alt={currentAuthor.name}
                className="rounded-circle"
                style={{ width: 32, height: 32, objectFit: "cover", flexShrink: 0 }}
              />
              <input
                type="text"
                className="form-control rounded-pill border-0 bg-light"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddComment();
                  }
                }}
                style={{ fontSize: 14, padding: "8px 14px" }}
              />
              <button
                type="button"
                className="btn btn-primary rounded-pill px-3"
                onClick={handleAddComment}
                disabled={!comment.trim()}
              >
                Post
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPostCard;
