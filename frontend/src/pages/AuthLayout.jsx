import { Outlet } from "react-router-dom";
import "./auth.css";

export default function AuthLayout() {
  return (
    <div className="auth-bg">
      <div className="auth-glass">
        <h1 className="logo">🎵 The Stage</h1>
        <h2>Experience the World of Sound</h2>
        <p className="subtitle">
          Discover music, podcasts, and curated experiences anytime, anywhere.
        </p>

        <Outlet />

        <div className="auth-links">
          <span>Learn More</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
}
