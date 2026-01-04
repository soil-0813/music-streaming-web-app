import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import chillBeatsImg from "../assets/chill-beats.jpg";

import "../styles/library.css";

export default function Library() {
  const [tracks, setTracks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/tracks")
      .then((res) => res.json())
      .then((data) => setTracks(data))
      .catch((err) => console.error("Tracks fetch error:", err));
  }, []);

  const openTrack = (track) => {
    // ✅ go to /tracks ONLY
    navigate("/tracks");
  };

  return (
    <div className="library-layout">
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

      {/* MAIN CONTENT */}
      <main className="library-main">
        <h1>Music Library</h1>
        <p className="subtitle">All your favorite tracks in one place.</p>

        {/* TOP CARDS */}
        <div className="library-cards">
          {tracks.slice(0, 4).map((track) => (
            <div
              key={track.id}
              className="music-card"
              onClick={() => openTrack(track)}
            >
              {/* ✅ FIXED IMAGE */}
              <img src={chillBeatsImg} alt={track.title} />

              <h4>{track.title}</h4>
              <p>{track.artist}</p>
            </div>
          ))}
        </div>

        {/* SONG LIST */}
        <div className="song-list">
          <h2>Songs List</h2>

          {tracks.map((track) => (
            <div
              key={track.id}
              className="song-row"
              onClick={() => openTrack(track)}
            >
              {/* ✅ FIXED IMAGE */}
              <img src={chillBeatsImg} alt={track.title} />
              <div>
                <h4>{track.title}</h4>
                <p>{track.artist}</p>
              </div>
              <span>{track.duration || "3:20"}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
