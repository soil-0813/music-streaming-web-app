import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAudio } from "../context/useAudio";
import "../styles/podcastdetail.css";

function PodcastDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ FIXED
  const [episodes, setEpisodes] = useState([]);
  const { playTrack } = useAudio();

  useEffect(() => {
    fetch(`http://localhost:5000/podcasts/${id}/episodes`)
      .then((res) => res.json())
      .then((data) => setEpisodes(data));
  }, [id]);

  return (
    <div className="page">
      {/* ───────── SIDEBAR ───────── */}
      <aside className="sidebar">
        <div className="logo">🎵 The Stage</div>

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

      {/* ───────── CONTENT ───────── */}
      <section className="content">
        <h2>Recent Episodes</h2>

        {episodes.map((ep) => (
          <div key={ep.id} className="episode">
            <div>
              <h4>{ep.title}</h4>
              <p>{ep.duration}</p>
            </div>

            <button
              onClick={() =>
                playTrack({
                  title: ep.title,
                  audio_url:
                    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                })
              }
            >
              ▶
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default PodcastDetail;
