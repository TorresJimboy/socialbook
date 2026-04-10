import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Messenger from "./pages/Messenger";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/css/app.css";

// Layout wraps pages that need the top navbar
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
  </>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Public route — no navbar */}
        <Route path="/login" element={<Login />} />

        {/* App routes — with navbar */}
        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/messenger"
          element={
            <Layout>
              <Messenger />
            </Layout>
          }
        />

        {/* Stubs for sidebar links */}
        <Route
          path="/friends"
          element={
            <Layout>
              <div className="container py-5 text-center">
                <i className="bi bi-people display-3 text-muted"></i>
                <h3 className="mt-3">Friends</h3>
                <p className="text-muted">Friend suggestions coming soon.</p>
              </div>
            </Layout>
          }
        />
        <Route
          path="/groups"
          element={
            <Layout>
              <div className="container py-5 text-center">
                <i className="bi bi-grid-3x3-gap display-3 text-muted"></i>
                <h3 className="mt-3">Groups</h3>
                <p className="text-muted">Groups feature coming soon.</p>
              </div>
            </Layout>
          }
        />
        <Route
          path="/marketplace"
          element={
            <Layout>
              <div className="container py-5 text-center">
                <i className="bi bi-shop display-3 text-muted"></i>
                <h3 className="mt-3">Marketplace</h3>
                <p className="text-muted">Marketplace coming soon.</p>
              </div>
            </Layout>
          }
        />
        <Route
          path="/watch"
          element={
            <Layout>
              <div className="container py-5 text-center">
                <i className="bi bi-play-btn display-3 text-muted"></i>
                <h3 className="mt-3">Watch</h3>
                <p className="text-muted">Video feed coming soon.</p>
              </div>
            </Layout>
          }
        />
        <Route
          path="/memories"
          element={
            <Layout>
              <div className="container py-5 text-center">
                <i className="bi bi-clock-history display-3 text-muted"></i>
                <h3 className="mt-3">Memories</h3>
                <p className="text-muted">Your memories coming soon.</p>
              </div>
            </Layout>
          }
        />
        <Route
          path="/saved"
          element={
            <Layout>
              <div className="container py-5 text-center">
                <i className="bi bi-bookmark display-3 text-muted"></i>
                <h3 className="mt-3">Saved</h3>
                <p className="text-muted">Saved items coming soon.</p>
              </div>
            </Layout>
          }
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default App;