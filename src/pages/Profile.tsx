import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../data/users";
import { posts } from "../data/posts";
import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"posts" | "about" | "friends" | "photos">("posts");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userPosts = posts.filter((p) => p.userId === currentUser.id);

  const tabs: { key: typeof activeTab; label: string }[] = [
    { key: "posts", label: "Posts" },
    { key: "about", label: "About" },
    { key: "friends", label: "Friends" },
    { key: "photos", label: "Photos" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <div>
      {/* Cover Photo */}
      <div
        className="profile-cover position-relative"
        style={{ height: 340, borderRadius: "0 0 8px 8px" }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80) center/cover",
            borderRadius: "0 0 8px 8px",
            opacity: 0.6,
          }}
        />
        <button
          className="btn btn-light position-absolute fw-semibold d-flex align-items-center gap-2"
          style={{ bottom: 16, right: 24, borderRadius: 8 }}
        >
          <i className="bi bi-camera-fill"></i>
          Edit cover photo
        </button>
      </div>

      {/* Profile Info Bar */}
      <div className="bg-white shadow-sm" style={{ position: "relative" }}>
        <div className="container" style={{ maxWidth: 1080 }}>
          <div
            className="d-flex flex-column flex-md-row align-items-center align-items-md-end gap-3 pt-0 pb-3"
            style={{ paddingTop: 0 }}
          >
            {/* Avatar */}
            <div style={{ marginTop: -80, flexShrink: 0, position: "relative" }}>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="rounded-circle border border-4 border-white shadow"
                style={{ width: 168, height: 168, objectFit: "cover" }}
              />
              <button
                className="btn btn-light rounded-circle position-absolute d-flex align-items-center justify-content-center p-0"
                style={{ width: 36, height: 36, bottom: 8, right: 8, border: "1px solid #ccc" }}
              >
                <i className="bi bi-camera-fill" style={{ fontSize: 14 }}></i>
              </button>
            </div>

            {/* Name & Friends */}
            <div className="flex-grow-1 text-center text-md-start pb-2">
              <h2 className="fw-bold mb-0" style={{ fontSize: 30 }}>
                {currentUser.name}
              </h2>
              <p className="text-muted mb-0">{currentUser.friendsCount} friends</p>
              <div className="d-flex justify-content-center justify-content-md-start mt-1">
                {[47, 12, 44, 33, 25].map((img, i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/150?img=${img}`}
                    alt=""
                    className="rounded-circle border border-2 border-white"
                    style={{ width: 32, height: 32, objectFit: "cover", marginLeft: i === 0 ? 0 : -8 }}
                  />
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="d-flex gap-2 pb-2 align-items-center">
              <button className="btn btn-primary fw-semibold d-flex align-items-center gap-2 px-3">
                <i className="bi bi-plus-lg"></i>
                Add to Story
              </button>
              <button className="btn btn-secondary fw-semibold d-flex align-items-center gap-2 px-3">
                <i className="bi bi-pencil-fill"></i>
                Edit Profile
              </button>

              {/* Dropdown */}
              <div className="position-relative" ref={dropdownRef}>
                <button
                  className="btn btn-secondary px-2"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <i className="bi bi-chevron-down"></i>
                </button>

                {dropdownOpen && (
                  <div
                    className="bg-white rounded-3 shadow"
                    style={{
                      position: "absolute",
                      top: "calc(100% + 6px)",
                      right: 0,
                      minWidth: 200,
                      zIndex: 1000,
                      border: "1px solid #e4e6eb",
                      overflow: "hidden",
                    }}
                  >
                    <button
                      className="d-flex align-items-center gap-3 w-100 px-3 py-2 border-0 bg-white text-dark"
                      style={{ fontSize: 15, cursor: "pointer", transition: "background 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f2f5")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                    >
                      <i className="bi bi-person-fill fs-5 text-secondary"></i>
                      <span>View Profile</span>
                    </button>

                    <button
                      className="d-flex align-items-center gap-3 w-100 px-3 py-2 border-0 bg-white text-dark"
                      style={{ fontSize: 15, cursor: "pointer", transition: "background 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f2f5")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                    >
                      <i className="bi bi-gear-fill fs-5 text-secondary"></i>
                      <span>Settings</span>
                    </button>

                    <hr className="my-1 mx-3" />

                    <button
                      onClick={handleLogout}
                      className="d-flex align-items-center gap-3 w-100 px-3 py-2 border-0 bg-white text-danger"
                      style={{ fontSize: 15, cursor: "pointer", transition: "background 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#fff0f0")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                    >
                      <i className="bi bi-box-arrow-right fs-5"></i>
                      <span className="fw-semibold">Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="d-flex border-top overflow-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`btn fw-semibold px-4 py-3 rounded-0 border-0 ${
                  activeTab === tab.key ? "text-primary" : "text-secondary"
                }`}
                style={{
                  borderBottom: activeTab === tab.key ? "3px solid #1877f2" : "3px solid transparent",
                  fontSize: 15,
                }}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-4" style={{ maxWidth: 1080 }}>
        <div className="row g-4">
          {/* Left column */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 p-3 mb-3">
              <h5 className="fw-bold mb-3">Intro</h5>
              {currentUser.bio && (
                <p className="text-center text-dark mb-3">{currentUser.bio}</p>
              )}
              <div className="d-flex flex-column gap-2 text-secondary" style={{ fontSize: 15 }}>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-geo-alt-fill text-dark"></i>
                  <span>
                    Lives in <strong className="text-dark">{currentUser.location}</strong>
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-people-fill text-dark"></i>
                  <span>
                    <strong className="text-dark">{currentUser.friendsCount}</strong> friends
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-calendar3 text-dark"></i>
                  <span>Joined January 2019</span>
                </div>
              </div>
              <button className="btn btn-light w-100 fw-semibold mt-3 rounded-3">Edit details</button>
              <button className="btn btn-light w-100 fw-semibold mt-2 rounded-3">Add hobbies</button>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Photos</h5>
                <a href="#" className="text-primary text-decoration-none fw-semibold">
                  See all photos
                </a>
              </div>
              <div className="row g-2">
                {[
                  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80",
                  "https://images.unsplash.com/photo-1546519638405-a2b97e7d2a5e?w=200&q=80",
                  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
                  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=200&q=80",
                  "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=200&q=80",
                  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&q=80",
                ].map((img, i) => (
                  <div key={i} className="col-4">
                    <img
                      src={img}
                      alt=""
                      className="w-100 rounded-3"
                      style={{ aspectRatio: "1/1", objectFit: "cover", cursor: "pointer" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="col-lg-7">
            {activeTab === "posts" && (
              <>
                {userPosts.length === 0 ? (
                  <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
                    <i className="bi bi-journal-text display-4 text-muted mb-3"></i>
                    <p className="text-muted">No posts to show yet.</p>
                  </div>
                ) : (
                  userPosts.map((post) => <PostCard key={post.id} post={post} />)
                )}
              </>
            )}

            {activeTab === "about" && (
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-bold mb-4">About</h5>
                <div className="d-flex flex-column gap-3 text-secondary" style={{ fontSize: 15 }}>
                  <div>
                    <strong className="text-dark d-block mb-1">Bio</strong>
                    {currentUser.bio}
                  </div>
                  <div>
                    <strong className="text-dark d-block mb-1">Location</strong>
                    {currentUser.location}
                  </div>
                  <div>
                    <strong className="text-dark d-block mb-1">Joined</strong>
                    January 2019
                  </div>
                </div>
              </div>
            )}

            {activeTab === "friends" && (
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-bold mb-4">Friends · {currentUser.friendsCount}</h5>
                <div className="row g-3">
                  {[47, 12, 44, 33, 25, 15, 48, 18].map((img, i) => (
                    <div key={i} className="col-4">
                      <div className="text-center" style={{ cursor: "pointer" }}>
                        <img
                          src={`https://i.pravatar.cc/150?img=${img}`}
                          alt=""
                          className="rounded-3 w-100 mb-1"
                          style={{ aspectRatio: "1/1", objectFit: "cover" }}
                        />
                        <p className="mb-0 fw-semibold text-dark" style={{ fontSize: 13 }}>
                          Friend {i + 1}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "photos" && (
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-bold mb-4">Photos</h5>
                <div className="row g-2">
                  {[
                    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
                    "https://images.unsplash.com/photo-1546519638405-a2b97e7d2a5e?w=400&q=80",
                    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
                    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80",
                    "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400&q=80",
                    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80",
                  ].map((img, i) => (
                    <div key={i} className="col-4">
                      <img
                        src={img}
                        alt=""
                        className="w-100 rounded-3 post-image"
                        style={{ aspectRatio: "1/1", objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;