import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Messenger from "./pages/Messenger";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/css/app.css";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
  </>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* Protected — must be logged in */}
          <Route path="/home" element={
            <ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>
          } />
          <Route path="/messenger" element={
            <ProtectedRoute><Layout><Messenger /></Layout></ProtectedRoute>
          } />
          <Route path="/friends" element={
            <ProtectedRoute><Layout>
              <div className="container py-5 text-center">
                <i className="bi bi-people display-3 text-muted"></i>
                <h3 className="mt-3">Friends</h3>
                <p className="text-muted">Coming soon.</p>
              </div>
            </Layout></ProtectedRoute>
          } />
          <Route path="/groups" element={
            <ProtectedRoute><Layout>
              <div className="container py-5 text-center">
                <i className="bi bi-grid-3x3-gap display-3 text-muted"></i>
                <h3 className="mt-3">Groups</h3>
                <p className="text-muted">Coming soon.</p>
              </div>
            </Layout></ProtectedRoute>
          } />
          <Route path="/marketplace" element={
            <ProtectedRoute><Layout>
              <div className="container py-5 text-center">
                <i className="bi bi-shop display-3 text-muted"></i>
                <h3 className="mt-3">Marketplace</h3>
                <p className="text-muted">Coming soon.</p>
              </div>
            </Layout></ProtectedRoute>
          } />
          <Route path="/watch" element={
            <ProtectedRoute><Layout>
              <div className="container py-5 text-center">
                <i className="bi bi-play-btn display-3 text-muted"></i>
                <h3 className="mt-3">Watch</h3>
                <p className="text-muted">Coming soon.</p>
              </div>
            </Layout></ProtectedRoute>
          } />
          <Route path="/memories" element={
            <ProtectedRoute><Layout>
              <div className="container py-5 text-center">
                <i className="bi bi-clock-history display-3 text-muted"></i>
                <h3 className="mt-3">Memories</h3>
                <p className="text-muted">Coming soon.</p>
              </div>
            </Layout></ProtectedRoute>
          } />
          <Route path="/saved" element={
            <ProtectedRoute><Layout>
              <div className="container py-5 text-center">
                <i className="bi bi-bookmark display-3 text-muted"></i>
                <h3 className="mt-3">Saved</h3>
                <p className="text-muted">Coming soon.</p>
              </div>
            </Layout></ProtectedRoute>
          } />

          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;