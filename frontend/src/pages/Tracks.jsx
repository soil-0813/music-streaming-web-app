import "../styles/tracks.css";
import { useAudio } from "../context/useAudio";
import defaultCover from "../assets/chill-beats.jpg"; // ✅ asset image

export default function Tracks() {
  const { currentTrack } = useAudio();

  if (!currentTrack) {
    return <p style={{ textAlign: "center" }}>No track playing</p>;
  }

  return (
    <div className="tracks-page">
      <div className="track-player-card">
        <div className="track-cover">
          <img
            src={
              currentTrack.cover_url
                ? `http://localhost:5000${currentTrack.cover_url}`
                : defaultCover
            }
            alt={currentTrack.title}
          />
        </div>

        <h2 className="track-title">{currentTrack.title}</h2>
        <p className="track-artist">{currentTrack.artist}</p>

        {/* visual bar only */}
        <div className="track-progress" />
      </div>
    </div>
  );
}
