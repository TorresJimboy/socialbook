import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { DEFAULT_PROFILE_IMAGE } from "../lib/profile";

type Mode = "login" | "signup";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Auto redirect if already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/home");
      }
    };
    checkUser();
  }, [navigate]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    resetForm();
    setShowLoginPassword(false);
    setShowSignupPassword(false);
    setShowConfirmPassword(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    });

    if (error) {
      setError(error.message);
    } else if (!data.session) {
      setError("Please confirm your email before logging in.");
    } else {
      navigate("/home");
    }

    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password.trim(),
      options: {
        data: {
          name: name.trim(),
          avatar_url: DEFAULT_PROFILE_IMAGE,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else if (data.session) {
      navigate("/home");
    } else {
      setSuccess(
        "Account created! Check your email to confirm your account."
      );
      resetForm();
      setTimeout(() => switchMode("login"), 3000);
    }

    setLoading(false);
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
        {/* Left branding */}
        <div className="col-md-6 text-center text-md-start px-4 mb-4 mb-md-0">
          <h1
            className="text-primary fw-bold mb-2"
            style={{
              fontSize: 52,
              fontFamily: "Nunito, sans-serif",
              letterSpacing: -1,
            }}
          >
            socialbook
          </h1>
          <p
            className="text-dark mb-0"
            style={{ fontSize: 26, lineHeight: 1.4, maxWidth: 380 }}
          >
            Connect with friends and the world around you on Socialbook.
          </p>
        </div>

        {/* Right form */}
        <div className="col-md-4">
          <div className="card border-0 shadow rounded-4 p-4">
            {/* Mode tabs */}
            <div className="d-flex mb-4 border-bottom">
              <button
                className={`btn border-0 fw-semibold pb-2 me-3 rounded-0 ${
                  mode === "login"
                    ? "text-primary border-bottom border-2 border-primary"
                    : "text-muted"
                }`}
                onClick={() => switchMode("login")}
              >
                Log In
              </button>
              <button
                className={`btn border-0 fw-semibold pb-2 rounded-0 ${
                  mode === "signup" ? "text-primary" : "text-muted"
                }`}
                onClick={() => switchMode("signup")}
              >
                Create Account
              </button>
            </div>

            {/* Alerts */}
            {error && (
              <div className="alert alert-danger py-2 mb-3 rounded-3">
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success py-2 mb-3 rounded-3">
                {success}
              </div>
            )}

            {/* LOGIN */}
            {mode === "login" && (
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  className="form-control rounded-3 mb-3"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="position-relative mb-3">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    className="form-control rounded-3 pe-5"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn border-0 bg-transparent position-absolute top-50 end-0 translate-middle-y text-muted"
                    onClick={() => setShowLoginPassword((current) => !current)}
                    aria-label={showLoginPassword ? "Hide password" : "Show password"}
                  >
                    <i className={`bi ${showLoginPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                  </button>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-bold rounded-3 mb-3"
                  disabled={loading || !email || !password}
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-link text-primary p-0"
                    onClick={() =>
                      alert("Forgot password feature coming soon")
                    }
                  >
                    Forgot password?
                  </button>
                </div>

                <hr className="my-3" />

                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-success px-4 py-2 fw-semibold rounded-3"
                    onClick={() => switchMode("signup")}
                  >
                    Create new account
                  </button>
                </div>
              </form>
            )}

            {/* SIGNUP */}
            {mode === "signup" && (
              <form onSubmit={handleSignup}>
                <input
                  type="text"
                  className="form-control rounded-3 mb-3"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className="form-control rounded-3 mb-3"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="position-relative mb-3">
                  <input
                    type={showSignupPassword ? "text" : "password"}
                    className="form-control rounded-3 pe-5"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn border-0 bg-transparent position-absolute top-50 end-0 translate-middle-y text-muted"
                    onClick={() => setShowSignupPassword((current) => !current)}
                    aria-label={showSignupPassword ? "Hide password" : "Show password"}
                  >
                    <i className={`bi ${showSignupPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                  </button>
                </div>
                <div className="position-relative mb-3">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control rounded-3 pe-5"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    required
                  />
                  <button
                    type="button"
                    className="btn border-0 bg-transparent position-absolute top-50 end-0 translate-middle-y text-muted"
                    onClick={() => setShowConfirmPassword((current) => !current)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                  </button>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 fw-bold rounded-3"
                  disabled={
                    loading ||
                    !email ||
                    !password ||
                    !confirmPassword ||
                    !name
                  }
                >
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </form>
            )}
          </div>

          <p className="text-center text-muted mt-3">
            <strong className="text-dark">Create a Page</strong> for a celebrity,
            brand or business.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
