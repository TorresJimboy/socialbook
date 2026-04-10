import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { currentUser } from "../data/users";
import { shortcuts } from "../data/shortcuts";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);

  const navItems = [
    { icon: "bi-house-fill", label: "Home", path: "/home" },
    { icon: "bi-people-fill", label: "Friends", path: "/friends" },
    { icon: "bi-grid-3x3-gap-fill", label: "Groups", path: "/groups" },
    { icon: "bi-shop", label: "Marketplace", path: "/marketplace" },
    { icon: "bi-play-btn-fill", label: "Watch", path: "/watch" },
    { icon: "bi-clock-history", label: "Memories", path: "/memories" },
    { icon: "bi-bookmark-fill", label: "Saved", path: "/saved" },
  ];

  const visibleItems = showMore ? navItems : navItems.slice(0, 7);

  return (
    <aside
      className="position-sticky d-flex flex-column"
      style={{ top: 68, height: "calc(100vh - 68px)", overflowY: "auto", paddingBottom: 20 }}
    >
      {/* Profile link */}
      <div
        className="d-flex align-items-center gap-3 px-3 py-2 rounded-3 mb-1 sidebar-item"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/profile")}
      >
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="rounded-circle"
          style={{ width: 36, height: 36, objectFit: "cover" }}
        />
        <span className="fw-semibold text-dark" style={{ fontSize: 15 }}>
          {currentUser.name}
        </span>
      </div>

      {/* Nav items */}
      {visibleItems.map((item) => (
        <SidebarItem
          key={item.path}
          icon={item.icon}
          label={item.label}
          active={location.pathname === item.path}
          onClick={() => navigate(item.path)}
        />
      ))}

      <SidebarItem
        icon={showMore ? "bi-chevron-up" : "bi-chevron-down"}
        label={showMore ? "Show less" : "See more"}
        onClick={() => setShowMore(!showMore)}
      />

      <hr className="my-2 mx-3" />

      {/* Shortcuts */}
      <div className="px-3 mb-2">
        <p className="text-muted fw-semibold mb-2" style={{ fontSize: 13 }}>
          Your Shortcuts
        </p>
        {shortcuts.map((shortcut) => (
          <div
            key={shortcut.id}
            className="d-flex align-items-center gap-3 py-2 rounded-3 sidebar-item px-2 mb-1"
            style={{ cursor: "pointer" }}
          >
            {shortcut.image ? (
              <img
                src={shortcut.image}
                alt={shortcut.name}
                className="rounded-2"
                style={{ width: 36, height: 36, objectFit: "cover" }}
              />
            ) : (
              <div
                className="bg-secondary bg-opacity-25 rounded-2 d-flex align-items-center justify-content-center"
                style={{ width: 36, height: 36 }}
              >
                <i className={`bi ${shortcut.icon}`}></i>
              </div>
            )}
            <span className="text-dark" style={{ fontSize: 15 }}>
              {shortcut.name}
            </span>
          </div>
        ))}
      </div>

      <p className="text-muted px-3 mt-auto" style={{ fontSize: 11 }}>
        Privacy · Terms · Advertising · Ad Choices · Cookies · More · Socialbook © 2025
      </p>
    </aside>
  );
};

export default Sidebar;
