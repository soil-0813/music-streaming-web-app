import { useState, useMemo, useContext } from "react";
import "../styles/search.css";
import { useNavigate } from "react-router-dom";
import chillBeatsImg from "../assets/chill-beats.jpg";
import { AudioContext } from "../context/AudioContext";

export default function Search({ tracks, podcasts }) {
  const [query, setQuery] = useState("");
  const { playTrack } = useContext(AudioContext);
  const navigate = useNavigate();

  // 🛡 SAFETY: normalize data
  const safeTracks = Array.isArray(tracks)
    ? tracks
    : Array.isArray(tracks?.data)
    ? tracks.data
    : [];

  const safePodcasts = Array.isArray(podcasts)
    ? podcasts
    : Array.isArray(podcasts?.data)
    ? podcasts.data
    : [];

  const results = useMemo(() => {
    const q = query.toLowerCase();

    const trackResults = safeTracks
      .filter((t) => t.title.toLowerCase().includes(q))
      .map((t) => ({ ...t, type: "track" }));

    const podcastResults = safePodcasts
      .filter((p) => p.title.toLowerCase().includes(q))
      .map((p) => ({ ...p, type: "podcast" }));

    return query
      ? [...trackResults, ...podcastResults]
      : safeTracks.map((t) => ({ ...t, type: "track" }));
  }, [query, safeTracks, safePodcasts]);

  return (
    <div className="search-page">
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

      <main className="search-main">
        {/* 🔍 Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for songs, artists, or podcasts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* 🟣 Title */}
        <h2 className="search-title">
          {query ? "Search Results" : "Browse All"}
        </h2>

        {/* 🟪 Cards */}
        <div className="search-grid">
          {results.map((item) => (
            <div
              key={`${item.type}-${item.id}`}
              className="search-card"
              onClick={() => {
                if (item.type === "track") playTrack(item);
              }}
            >
              <img src={chillBeatsImg} alt={item.title} />

              <div className="search-card-info">
                <h4>{item.title}</h4>
                <p>{item.artist || item.host}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ❌ Empty state */}
        {query && results.length === 0 && (
          <p className="empty-search">No results found</p>
        )}
      </main>
    </div>
  );
}
