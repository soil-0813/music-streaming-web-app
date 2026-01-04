import { useEffect, useState } from "react";
import MusicCard from "../components/MusicCard";
import { useAudio } from "../context/useAudio";

function Music() {
  const [tracks, setTracks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { playTrack } = useAudio();

  const categories = ["All", "Pop", "Rock", "Podcast"];

  const filteredTracks =
    selectedCategory === "All"
      ? tracks
      : tracks.filter((track) => track.category === selectedCategory);

  useEffect(() => {
    fetch("http://localhost:5000/tracks")
      .then((res) => res.json())
      .then((data) => setTracks(data));
  }, []);

  return (
    <div>
      <h2>Browse Music</h2>

      {/* 🎛 Category Buttons */}
      <div className="category-buttons">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setSelectedCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      {/* 🎵 Music List */}
      <div className="music-grid">
        {filteredTracks.map((track) => (
          <MusicCard key={track.id} track={track} onPlay={playTrack} />
        ))}
      </div>
    </div>
  );
}

export default Music;
