import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  loadPersistedFeedPosts,
  loadStoredFeedPosts,
  Post,
  savePersistedFeedPosts,
  subscribeToFeedUpdates,
} from "../data/feedPosts";
import FeedPostCard from "../components/FeedPostCard";
import {
  DEFAULT_PROFILE_IMAGE,
  getDisplayAvatar,
  getDisplayCover,
  getDisplayName,
} from "../lib/profile";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { profile, user, logout, updateProfileImages } = useAuth();
  const [activeTab, setActiveTab] = useState<"posts" | "about" | "friends" | "photos">("posts");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [uploading, setUploading] = useState<"avatar" | "cover" | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>(() =>
    loadStoredFeedPosts().filter((p) => p.userId === 1)
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Use real profile from Supabase, fall back to defaults
  const displayName = getDisplayName(profile, user);
  const displayAvatar = getDisplayAvatar(profile);
  const displayCover = getDisplayCover(profile);
  const displayBio = profile?.bio ?? "Software engineer & photography enthusiast 📷";
  const displayLocation = profile?.location ?? "San Francisco, CA";
  const displayFriends = profile?.friends_count ?? 342;

  const tabs: { key: typeof activeTab; label: string }[] = [
    { key: "posts", label: "Posts" },
    { key: "about", label: "About" },
    { key: "friends", label: "Friends" },
    { key: "photos", label: "Photos" },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const syncPosts = () => {
      void loadPersistedFeedPosts().then((posts) => {
        setUserPosts(posts.filter((p) => p.userId === 1));
      });
    };

    syncPosts();
    const unsubscribe = subscribeToFeedUpdates(syncPosts);

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate("/login");
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "cover"
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(type);

    try {
      const imageDataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Failed to read image file."));
        reader.readAsDataURL(file);
      });

      await updateProfileImages(
        type === "avatar"
          ? { avatar_url: imageDataUrl }
          : { cover_url: imageDataUrl }
      );
    } catch (error) {
      console.error(`Failed to update ${type} image:`, error);
    } finally {
      setUploading(null);
      event.target.value = "";
    }
  };

  const handleUpdatePost = (updatedPost: Post) => {
    setUserPosts((currentPosts) => {
      const nextPosts = currentPosts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      );
      void savePersistedFeedPosts(nextPosts.concat(loadStoredFeedPosts().filter((post) => post.userId !== 1)));
      return nextPosts;
    });
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
            background: `url(${displayCover}) center/cover`,
            borderRadius: "0 0 8px 8px",
            opacity: 0.72,
          }}
        />
        <button
          className="btn btn-light position-absolute fw-semibold d-flex align-items-center gap-2"
          style={{ bottom: 16, right: 24, borderRadius: 8 }}
          onClick={() => coverInputRef.current?.click()}
        >
          <i className="bi bi-camera-fill"></i>
          {uploading === "cover" ? "Updating cover..." : "Edit cover photo"}
        </button>
        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          className="d-none"
          onChange={(e) => handleImageChange(e, "cover")}
        />
      </div>

      {/* Profile Info Bar */}
      <div className="bg-white shadow-sm" style={{ position: "relative" }}>
        <div className="container" style={{ maxWidth: 1080 }}>
          <div
            className="d-flex flex-column flex-md-row align-items-center align-items-md-end gap-3 pt-0 pb-3"
          >
            {/* Avatar */}
            <div style={{ marginTop: -80, flexShrink: 0, position: "relative" }}>
              <img
                src={displayAvatar}
                alt={displayName}
                className="rounded-circle border border-4 border-white shadow"
                style={{ width: 168, height: 168, objectFit: "cover" }}
              />
              <button
                className="btn btn-light rounded-circle position-absolute d-flex align-items-center justify-content-center p-0"
                style={{ width: 36, height: 36, bottom: 8, right: 8, border: "1px solid #ccc" }}
                onClick={() => avatarInputRef.current?.click()}
              >
                <i className="bi bi-camera-fill" style={{ fontSize: 14 }}></i>
              </button>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="d-none"
                onChange={(e) => handleImageChange(e, "avatar")}
              />
            </div>

            {/* Name & Friends */}
            <div className="flex-grow-1 text-center text-md-start pb-2">
              <h2 className="fw-bold mb-0" style={{ fontSize: 30 }}>{displayName}</h2>
              <p className="text-muted mb-0">{displayFriends} friends</p>
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
              <button
                className="btn btn-primary fw-semibold d-flex align-items-center gap-2 px-3"

              >
                <i className="bi bi-plus-lg"></i>
                {uploading === "avatar" ? "Updating photo..." : "Add to Story"}
              </button>
              <button
                className="btn btn-secondary fw-semibold d-flex align-items-center gap-2 px-3"

              >
                <i className="bi bi-pencil-fill"></i>Edit Profile Photo
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
                      style={{ fontSize: 15, cursor: "pointer" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f2f5")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                    >
                      <i className="bi bi-person-fill fs-5 text-secondary"></i>
                      <span>View Profile</span>
                    </button>
                    <button
                      className="d-flex align-items-center gap-3 w-100 px-3 py-2 border-0 bg-white text-dark"
                      style={{ fontSize: 15, cursor: "pointer" }}
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
                      style={{ fontSize: 15, cursor: "pointer" }}
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
                className={`btn fw-semibold px-4 py-3 rounded-0 border-0 ${activeTab === tab.key ? "text-primary" : "text-secondary"
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
              {displayBio && (
                <p className="text-center text-dark mb-3">{displayBio}</p>
              )}
              {displayAvatar === DEFAULT_PROFILE_IMAGE && (
                <p className="text-center text-muted mb-3" style={{ fontSize: 14 }}>
                  Upload a profile photo to personalize your feed and story card.
                </p>
              )}
              <div className="d-flex flex-column gap-2 text-secondary" style={{ fontSize: 15 }}>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-geo-alt-fill text-dark"></i>
                  <span>Lives in <strong className="text-dark">{displayLocation}</strong></span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-people-fill text-dark"></i>
                  <span><strong className="text-dark">{displayFriends}</strong> friends</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-calendar3 text-dark"></i>
                  <span>
                    Joined{" "}
                    {profile?.created_at
                      ? new Date(profile.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })
                      : "January 2019"}
                  </span>
                </div>
              </div>
              <button
                className="btn btn-light w-100 fw-semibold mt-3 rounded-3"
                onClick={() => avatarInputRef.current?.click()}
              >
                Change profile photo
              </button>
              <button
                className="btn btn-light w-100 fw-semibold mt-2 rounded-3"
                onClick={() => coverInputRef.current?.click()}
              >
                Change cover photo
              </button>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Photos</h5>
                <a href="#" className="text-primary text-decoration-none fw-semibold">See all photos</a>
              </div>
              <div className="row g-2">
                {[
                  displayAvatar,
                  displayCover,
                  process.env.PUBLIC_URL + "/photos/apex.png",
                  process.env.PUBLIC_URL + "/photos/beach.jpg",
                  process.env.PUBLIC_URL + "/photos/console.webp",
                  process.env.PUBLIC_URL + "/photos/dawn.jpg",
                ].map((img, i) => (
                  <div key={i} className="col-4">
                    <img src={img} alt="" className="w-100 rounded-3"
                      style={{ aspectRatio: "1/1", objectFit: "cover", cursor: "pointer" }} />
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
                  userPosts.map((post) => (
                    <FeedPostCard
                      key={post.id}
                      post={post}
                      onUpdate={handleUpdatePost}
                    />
                  ))
                )}
              </>
            )}
            {activeTab === "about" && (
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-bold mb-4">About</h5>
                <div className="d-flex flex-column gap-3 text-secondary" style={{ fontSize: 15 }}>
                  <div><strong className="text-dark d-block mb-1">Name</strong>{displayName}</div>
                  <div><strong className="text-dark d-block mb-1">Bio</strong>{displayBio}</div>
                  <div><strong className="text-dark d-block mb-1">Location</strong>{displayLocation}</div>
                  <div>
                    <strong className="text-dark d-block mb-1">Joined</strong>
                    {profile?.created_at
                      ? new Date(profile.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })
                      : "January 2019"}
                  </div>
                </div>
              </div>
            )}
            {activeTab === "friends" && (
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-bold mb-4">Friends · {displayFriends}</h5>
                <div className="row g-3">
                  {[47, 12, 44, 33, 25, 15, 48, 18].map((img, i) => (
                    <div key={i} className="col-4">
                      <div className="text-center" style={{ cursor: "pointer" }}>
                        <img src={`https://i.pravatar.cc/150?img=${img}`} alt=""
                          className="rounded-3 w-100 mb-1"
                          style={{ aspectRatio: "1/1", objectFit: "cover" }} />
                        <p className="mb-0 fw-semibold text-dark" style={{ fontSize: 13 }}>Friend {i + 1}</p>
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
                    displayAvatar,
                    displayCover,
                    process.env.PUBLIC_URL + "/photos/apex.png",
                    process.env.PUBLIC_URL + "/photos/beach.jpg",
                    process.env.PUBLIC_URL + "/photos/console.webp",
                    process.env.PUBLIC_URL + "/photos/dawn.jpg",
                    process.env.PUBLIC_URL + "/photos/green.jpg",
                    process.env.PUBLIC_URL + "/photos/lake.jpg",
                    process.env.PUBLIC_URL + "/photos/panda.jpg",
                    process.env.PUBLIC_URL + "/photos/rocks.jpg",
                    process.env.PUBLIC_URL + "/photos/valorant.webp",
                  ].map((img, i) => (
                    <div key={i} className="col-4">
                      <img src={img} alt="" className="w-100 rounded-3 post-image"
                        style={{ aspectRatio: "1/1", objectFit: "cover" }} />
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
