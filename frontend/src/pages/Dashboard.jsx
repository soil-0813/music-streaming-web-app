import { useEffect, useState, useContext } from "react";
import { useAudio } from "../context/useAudio";
import chillBeatsImg from "../assets/chill-beats.jpg";

import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Tracks from "./Tracks";
import "../styles/dashboard.css";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { playTrack } = useAudio();
  const [chillTrack, setChillTrack] = useState(null);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    fetch("http://localhost:5000/tracks")
      .then((res) => res.json())
      .then((data) => {
        const chill = data.find((t) => t.title.toLowerCase() === "chill beats");
        setChillTrack(chill);
      });
  }, []);

  return (
    <div className="dashboard">
      {/* ───────── SIDEBAR ───────── */}
      <aside className="sidebar">
        <h2 className="logo">🎵 The Stage</h2>

        <nav className="nav-links">
          <button onClick={() => navigate("/dashboard")}>🏠 Home</button>
          <button onClick={() => navigate("/library")}>📚 Library</button>
          <button onClick={() => navigate("/podcasts")}>🎙 Podcasts</button>
          <button onClick={() => navigate("/search")}>🔍 Search</button>
        </nav>

        <div className="playlist-section">
          <h4>Your Playlists</h4>
          <button
            className="create-playlist"
            onClick={() => navigate("/playlists")}
          >
            ➕ Create Playlist
          </button>

          <ul>
            <li>Chill Morning</li>
            <li>Deep Focus</li>
            <li>Soft Lavender Beats</li>
          </ul>
        </div>
      </aside>

      {/* ───────── MAIN CONTENT ───────── */}
      <main className="main-content">
        <h1>Welcome back!</h1>
        <p className="subtitle">Discover something new today.</p>

        {/* TRENDING */}
        <section>
          <div className="section-header">
            <h2>Trending Now</h2>
            <span>See All</span>
          </div>

          <div className="card-row">
            {/* 🎵 Chill Beats – SPECIAL CARD */}
            <div
              className="glass-card"
              onClick={() => {
                if (!chillTrack) return;
                playTrack(chillTrack);
                navigate("/tracks");
              }}
            >
              <img src={chillBeatsImg} alt="Chill Beats" />
              <h4>Chill Beats</h4>
              <p>Beat Maker</p>
            </div>

            {/* Other cards remain SAME */}
            {["Neon Whispers", "Midnight Sun", "Crystal Clear"].map(
              (title, index) => (
                <div key={index} className="glass-card">
                  <img
                    src={`https://picsum.photos/200?random=${index + 20}`}
                    alt={title}
                  />
                  <h4>{title}</h4>
                  <p>Artist Name</p>
                </div>
              )
            )}
          </div>
        </section>

        {/* RECENTLY PLAYED */}
        <section>
          <h2 className="mt">Recently Played</h2>

          <div className="card-row">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="glass-card small">
                <img
                  src={`https://picsum.photos/200?blur=2&random=${i + 10}`}
                  alt="track"
                />
                <h4>Track {i}</h4>
                <p>Artist</p>
              </div>
            ))}
          </div>
        </section>

        {/* 🔥 EXISTING MUSIC PLAYER – DO NOT TOUCH */}
        <section className="mt">
          <Tracks />
        </section>
      </main>
    </div>
  );
}
