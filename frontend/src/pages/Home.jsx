import { useNavigate } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <div className="home-card">
        <div className="logo">🎵</div>
        <h1>The Stage</h1>

        <h2>
          Experience the World <br />
          <span>of Sound</span>
        </h2>

        <p>
          Immerse yourself in endless music. Discover new artists and enjoy
          curated mixes anytime, anywhere.
        </p>

        <div className="home-actions">
          <button onClick={() => navigate("/signup")} className="primary-btn">
            Sign Up
          </button>
          <button onClick={() => navigate("/login")} className="outline-btn">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
