import React from "react";

interface SidebarItemProps {
  icon: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active = false, onClick }) => {
  return (
    <div
      className={`d-flex align-items-center gap-3 px-3 py-2 rounded-3 mb-1 sidebar-item ${active ? "active" : ""}`}
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <div
        className={`d-flex align-items-center justify-content-center rounded-circle ${active ? "bg-primary bg-opacity-10" : ""}`}
        style={{ width: 36, height: 36, flexShrink: 0 }}
      >
        <i className={`bi ${icon} fs-5 ${active ? "text-primary" : "text-dark"}`}></i>
      </div>
      <span className={`fw-500 ${active ? "text-primary fw-semibold" : "text-dark"}`} style={{ fontSize: 15 }}>
        {label}
      </span>
    </div>
  );
};

export default SidebarItem;
