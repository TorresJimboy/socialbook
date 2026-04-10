import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setLoading(false);
      navigate("/home");
    }, 800);
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center"
      style={{ background: "#f0f2f5" }}
    >
      <div
        className="row w-100 justify-content-center align-items-center g-0 px-3"
        style={{ maxWidth: 980 }}
      >
        {/* Left: branding */}
        <div className="col-md-6 text-center text-md-start px-4 mb-4 mb-md-0">
          <h1
            className="text-primary fw-bold mb-2"
            style={{ fontSize: 52, fontFamily: "Nunito, sans-serif", letterSpacing: -1 }}
          >
            socialbook
          </h1>
          <p className="text-dark mb-0" style={{ fontSize: 26, lineHeight: 1.4, maxWidth: 380 }}>
            Connect with friends and the world around you on Socialbook.
          </p>
        </div>

        {/* Right: form */}
        <div className="col-md-4">
          <div className="card border-0 shadow rounded-4 p-4">
            {error && (
              <div className="alert alert-danger py-2 mb-3 rounded-3" style={{ fontSize: 14 }}>
                {error}
              </div>
            )}
            <form onSubmit={handleLogin}>
              <input
                type="email"
                className="form-control rounded-3 mb-3"
                placeholder="Email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: "14px 16px", fontSize: 16 }}
              />
              <input
                type="password"
                className="form-control rounded-3 mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: "14px 16px", fontSize: 16 }}
              />
              <button
                type="submit"
                className="btn btn-primary w-100 fw-bold rounded-3 mb-3"
                style={{ padding: "13px", fontSize: 18 }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Logging in...
                  </>
                ) : (
                  "Log In"
                )}
              </button>
              <div className="text-center mb-3">
                <a href="#" className="text-primary text-decoration-none fw-semibold">
                  Forgot password?
                </a>
              </div>
              <hr className="my-3" />
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-success px-4 py-2 fw-semibold rounded-3"
                  style={{ fontSize: 16 }}
                  onClick={() => navigate("/home")}
                >
                  Create new account
                </button>
              </div>
            </form>
          </div>

          <p className="text-center text-muted mt-3" style={{ fontSize: 13 }}>
            <strong className="text-dark">Create a Page</strong> for a celebrity, brand or business.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 text-center text-muted" style={{ fontSize: 12 }}>
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-2">
          {["English", "Filipino", "Español", "Français", "Deutsch", "中文", "日本語"].map((lang) => (
            <a key={lang} href="#" className="text-muted text-decoration-none">
              {lang}
            </a>
          ))}
        </div>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {["Sign Up", "Log In", "Messenger", "Facebook Lite", "Watch", "People", "Privacy", "Terms", "Help"].map(
            (item) => (
              <a key={item} href="#" className="text-muted text-decoration-none">
                {item}
              </a>
            )
          )}
        </div>
        <p className="mt-2">Socialbook © 2025</p>
      </div>
    </div>
  );
};

export default Login;
