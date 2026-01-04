import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PodcastCard from "../components/PodcastCard";
import "../styles/podcasts.css";

function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/podcasts")
      .then((res) => res.json())
      .then((data) => setPodcasts(data))
      .catch((err) => console.error("Podcast fetch error:", err));
  }, []);

  const openPodcast = (podcast) => {
    navigate(`/podcasts/${podcast.id}`);
  };

  return (
    <div className="dashboard-layout">
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
      <main className="content">
        <h1>Podcasts</h1>
        <p className="subtitle">
          Explore stories, tech, and lifestyle insights.
        </p>

        <div className="grid">
          {podcasts.length === 0 ? (
            <p>No podcasts available</p>
          ) : (
            podcasts.map((podcast) => (
              <PodcastCard
                key={podcast.id}
                podcast={podcast}
                onOpen={openPodcast}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Podcasts;
