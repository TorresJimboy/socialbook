import React from "react";
import { Story } from "../data/stories";
import { users } from "../data/users";

interface StoryCardProps {
  story: Story;
}

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  const author = users.find((u) => u.id === story.userId);

  return (
    <div
      className="story-card position-relative rounded-4 overflow-hidden flex-shrink-0"
      style={{ width: 112, height: 200, cursor: "pointer" }}
    >
      <img
        src={story.image}
        alt="story"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        className="position-absolute bottom-0 start-0 end-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.6) 40%, transparent)",
          padding: "8px 8px 10px",
        }}
      >
        <span className="text-white fw-semibold" style={{ fontSize: 12 }}>
          {author?.name.split(" ")[0]}
        </span>
      </div>
      {author && (
        <div className="position-absolute top-0 start-0 m-2">
          <img
            src={author.avatar}
            alt={author.name}
            className="rounded-circle border border-3 border-primary"
            style={{ width: 40, height: 40, objectFit: "cover" }}
          />
        </div>
      )}
    </div>
  );
};

export const CreateStoryCard: React.FC = () => {
  return (
    <div
      className="story-card position-relative rounded-4 overflow-hidden flex-shrink-0 bg-white"
      style={{ width: 112, height: 200, cursor: "pointer" }}
    >
      <div style={{ height: 130, overflow: "hidden" }}>
        <img
          src= {process.env.PUBLIC_URL + "/avatars/jim.png"}
          alt="create story"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="position-absolute d-flex flex-column align-items-center justify-content-end pb-3 bottom-0 start-0 end-0">
        <div
          className="bg-primary rounded-circle d-flex align-items-center justify-content-center border border-3 border-white"
          style={{ width: 38, height: 38, marginBottom: 6 }}
        >
          <i className="bi bi-plus-lg text-white fw-bold"></i>
        </div>
        <span className="fw-semibold text-dark" style={{ fontSize: 12 }}>
          Create Story
        </span>
      </div>
    </div>
  );
};

export default StoryCard;
