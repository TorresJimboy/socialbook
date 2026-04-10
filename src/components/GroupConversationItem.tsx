import React from "react";

interface GroupConversationItemProps {
  name: string;
  icon: string;
}

const GroupConversationItem: React.FC<GroupConversationItemProps> = ({ name, icon }) => {
  return (
    <div
      className="d-flex align-items-center gap-2 px-2 py-2 rounded-3 sidebar-item"
      style={{ cursor: "pointer" }}
    >
      <div
        className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
        style={{ width: 36, height: 36, background: "#e4e6eb" }}
      >
        <i className={`bi ${icon} text-secondary`}></i>
      </div>
      <span className="text-dark" style={{ fontSize: 15 }}>
        {name}
      </span>
    </div>
  );
};

export default GroupConversationItem;
