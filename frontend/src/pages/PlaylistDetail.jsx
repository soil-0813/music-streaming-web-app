import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { useAudio } from "../context/useAudio";
import "../styles/playlistdetail.css";

export default function PlaylistDetail() {
  const { id } = useParams();
  const { playTrack } = useAudio();
  const [tracks, setTracks] = useState([]);
  const [allTracks, setAllTracks] = useState([]);
  const navigate = useNavigate();

  /* Fetch tracks in playlist */
  const fetchTracks = useCallback(async () => {
    const res = await fetch(`http://localhost:5000/playlists/${id}/tracks`);
    const data = await res.json();
    setTracks(Array.isArray(data) ? data : []);
  }, [id]);

  const addTrack = async (trackId) => {
    await fetch(`http://localhost:5000/playlists/${id}/tracks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ track_id: trackId }),
    });

    fetchTracks();
  };

  const removeTrack = async (trackId) => {
    await fetch(`http://localhost:5000/playlists/${id}/tracks/${trackId}`, {
      method: "DELETE",
    });

    fetchTracks();
  };

  const fetchAllTracks = useCallback(async () => {
    const res = await fetch("http://localhost:5000/tracks");
    const data = await res.json();
    setAllTracks(data);
  }, []);

  useEffect(() => {
    fetchTracks();
    fetchAllTracks();
  }, [fetchTracks, fetchAllTracks]);

  const playlistTrackIds = tracks.map((t) => t.id);

  const availableTracks = allTracks.filter(
    (track) => !playlistTrackIds.includes(track.id)
  );

  return (
    <div className="playlist-detail">
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
      <main className="playlistsdetail-content">
        <h2>Playlist Songs</h2>

        {tracks.length === 0 && (
          <p className="empty-text">No songs in this playlist</p>
        )}

        {tracks.map((track) => (
          <div key={track.id} className="playlist-track">
            <div className="playlist-track-left">
              <div className="playlist-track-cover" />
              <div>
                <div className="playlist-track-title">{track.title}</div>
                <div className="playlist-track-artist">{track.artist}</div>
              </div>
            </div>

            <div className="playlist-track-actions">
              <button
                className="play-btn"
                onClick={() =>
                  playTrack({
                    title: track.title,
                    audio_url: track.audio_url,
                  })
                }
              >
                ▶
              </button>

              <button
                className="remove-btn"
                onClick={() => removeTrack(track.id)}
              >
                ❌
              </button>
            </div>
          </div>
        ))}

        <h3 className="add-section-title">Add Tracks</h3>

        {availableTracks.length === 0 && (
          <p className="empty-text">All tracks already added 🎶</p>
        )}

        <div className="add-tracks-list">
          {availableTracks.map((track) => (
            <div key={track.id} className="add-track-row">
              <div>
                <div className="track-title">{track.title}</div>
                <div className="track-artist">{track.artist}</div>
              </div>

              <button className="add-btn" onClick={() => addTrack(track.id)}>
                ➕ Add
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
