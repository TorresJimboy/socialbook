import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDisplayAvatar, getDisplayName } from "../lib/profile";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile } = useAuth();
  const displayName = getDisplayName(profile, user);
  const displayAvatar = getDisplayAvatar(profile);

  const navTabs = [
    { path: "/home", icon: "bi-house-fill" },
    { path: "/friends", icon: "bi-people-fill" },
    { path: "/watch", icon: "bi-tv-fill" },
    { path: "/marketplace", icon: "bi-shop" },
    { path: "/groups", icon: "bi-grid-fill" },
  ];

  return (
    <nav
      className="navbar navbar-light bg-white shadow-sm px-3 py-0 position-sticky top-0"
      style={{ zIndex: 1000, height: 58 }}
    >
      <div className="container-fluid px-0 d-flex align-items-center gap-2">
        {/* Logo */}
        <div
          className="text-primary fw-bold fs-3 me-2"
          style={{ cursor: "pointer", fontFamily: "Nunito, sans-serif", letterSpacing: -1 }}
          onClick={() => navigate("/home")}
        >
          socialbook
        </div>

        {/* Search bar */}
        <div className="position-relative" style={{ minWidth: 240 }}>
          <span className="position-absolute top-50 translate-middle-y ms-3 text-muted">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control rounded-pill border-0 bg-light ps-5"
            placeholder="Search Socialbook"
            style={{ fontSize: 15, padding: "9px 16px" }}
          />
        </div>

        {/* Center nav tabs */}
        <div className="d-none d-lg-flex align-items-center gap-1 flex-grow-1 justify-content-center">
          {navTabs.map((tab) => (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`btn position-relative d-flex align-items-center justify-content-center rounded-3 ${
                location.pathname === tab.path
                  ? "text-primary"
                  : "text-secondary"
              }`}
              style={{ width: 114, height: 48, borderBottom: location.pathname === tab.path ? "3px solid #1877f2" : "3px solid transparent", borderRadius: 0 }}
            >
              <i className={`bi ${tab.icon} fs-4`}></i>
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="d-flex align-items-center gap-2 ms-auto">
          <button
            className="btn rounded-circle bg-light d-flex align-items-center justify-content-center"
            style={{ width: 40, height: 40 }}
            onClick={() => navigate("/messenger")}
          >
            <i className="bi bi-chat-dots-fill text-dark fs-5"></i>
          </button>
          <button className="btn rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
            <i className="bi bi-bell-fill text-dark fs-5"></i>
          </button>
          <img
            src={displayAvatar}
            alt={displayName}
            className="rounded-circle"
            style={{ width: 40, height: 40, objectFit: "cover", cursor: "pointer" }}
            onClick={() => navigate("/profile")}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
