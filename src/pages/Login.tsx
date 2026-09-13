import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Mode = "login" | "signup";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/home" replace />;

  const switchMode = (nextMode: Mode) => {
    setMode(nextMode);
    setName("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
  };

  const enter = async (guest = false) => {
    setLoading(true);
    try {
      // This demo accepts everyone. Passwords are never checked or stored.
      await login(guest ? "" : email, guest ? undefined : name);
      navigate("/home", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    void enter();
  };

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center"
      style={{ background: "#f0f2f5" }}>
      <div className="row w-100 justify-content-center align-items-center g-0 px-3" style={{ maxWidth: 980 }}>
        <div className="col-md-6 text-center text-md-start px-4 mb-4 mb-md-0">
          <h1 className="text-primary fw-bold mb-2"
            style={{ fontSize: 52, fontFamily: "Nunito, sans-serif", letterSpacing: -1 }}>
            socialbook
          </h1>
          <p className="text-dark mb-0" style={{ fontSize: 26, lineHeight: 1.4, maxWidth: 380 }}>
            Connect with friends and the world around you on Socialbook.
          </p>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow rounded-4 p-4">
            <div className="d-flex mb-3 border-bottom">
              <button className={`btn border-0 fw-semibold pb-2 me-3 rounded-0 ${mode === "login" ? "text-primary" : "text-muted"}`}
                onClick={() => switchMode("login")}>
                Log In
              </button>
              <button className={`btn border-0 fw-semibold pb-2 rounded-0 ${mode === "signup" ? "text-primary" : "text-muted"}`}
                onClick={() => switchMode("signup")}>
                Create Account
              </button>
            </div>
            <p className="text-muted small mb-3">
              Try the demo with any email or username. Passwords are optional.
            </p>

            <form onSubmit={handleSubmit}>
              {mode === "signup" && (
                <input type="text" className="form-control rounded-3 mb-3" placeholder="Full name"
                  aria-label="Full name" value={name} onChange={(event) => setName(event.target.value)} />
              )}
              <input type="text" className="form-control rounded-3 mb-3" placeholder="Email or username"
                aria-label="Email or username" autoComplete="username"
                value={email} onChange={(event) => setEmail(event.target.value)} />
              <div className="position-relative mb-3">
                <input type={showPassword ? "text" : "password"} className="form-control rounded-3 pe-5"
                  placeholder="Password (optional)" aria-label="Password (optional)" autoComplete="off"
                  value={password} onChange={(event) => setPassword(event.target.value)} />
                <button type="button"
                  className="btn border-0 bg-transparent position-absolute top-50 end-0 translate-middle-y text-muted"
                  onClick={() => setShowPassword(current => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}>
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </button>
              </div>
              <button type="submit" disabled={loading}
                className={`btn ${mode === "signup" ? "btn-success" : "btn-primary"} w-100 fw-bold rounded-3 mb-3`}>
                {loading ? "Please wait..." : mode === "signup" ? "Create Account" : "Log In"}
              </button>
              <button type="button" disabled={loading} onClick={() => void enter(true)}
                className="btn btn-outline-primary w-100 fw-semibold rounded-3">
                Continue as Guest
              </button>
            </form>
          </div>
          <p className="text-center text-muted small mt-3">
            Your demo profile and posts stay in this browser.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;