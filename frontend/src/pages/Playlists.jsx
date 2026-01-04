import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/playlist.css";

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/playlists")
      .then((res) => res.json())
      .then((data) => setPlaylists(Array.isArray(data) ? data : []));
  }, []);

  const createPlaylist = async () => {
    const name = prompt("Playlist name?");
    if (!name) return;

    await fetch("http://localhost:5000/playlists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const res = await fetch("http://localhost:5000/playlists");
    setPlaylists(await res.json());
  };

  return (
    <div className="playlists-page">
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

      {/* ───────── MAIN ───────── */}
      <main className="playlists-content">
        <div className="playlists-header">
          <h2>My Playlists</h2>
          <button className="create-btn" onClick={createPlaylist}>
            Create
          </button>
        </div>

        <div className="playlists-grid">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="playlist-card"
              onClick={() => navigate(`/playlists/${playlist.id}`)}
            >
              <div className="playlist-cover">🎵</div>
              <div className="playlist-name">{playlist.name}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
