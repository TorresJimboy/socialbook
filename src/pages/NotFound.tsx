import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center text-center px-3"
      style={{ background: "#f0f2f5" }}
    >
      <div className="mb-4">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="60" fill="#e4e6eb" />
          <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fontSize="48" fill="#1877f2" fontWeight="bold" fontFamily="Nunito">
            404
          </text>
        </svg>
      </div>
      <h2 className="fw-bold mb-2" style={{ fontSize: 28 }}>This page isn't available</h2>
      <p className="text-muted mb-4" style={{ maxWidth: 380, fontSize: 16 }}>
        The link may be broken, or the page may have been removed. Check to see if the link you're
        trying to open is correct.
      </p>
      <div className="d-flex gap-3">
        <button
          className="btn btn-primary px-4 py-2 rounded-3 fw-semibold"
          style={{ fontSize: 16 }}
          onClick={() => navigate("/home")}
        >
          Go to Home Feed
        </button>
        <button
          className="btn btn-light px-4 py-2 rounded-3 fw-semibold"
          style={{ fontSize: 16 }}
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
