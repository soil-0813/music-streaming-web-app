import { useAudio } from "../context/useAudio";
import { useEffect, useState } from "react";
import "../styles/player.css";

const MiniPlayer = () => {
  const { currentTrack, isPlaying, playTrack, pauseTrack, audioRef } =
    useAudio();

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (!isSeeking) setProgress(audio.currentTime);
    };

    const handleLoaded = () => {
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoaded);

    // Set initial duration in case metadata already loaded
    if (audio.readyState >= 1) {
      handleLoaded();
    }

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, [audioRef, isSeeking, currentTrack]);

  if (!currentTrack) return null;

  return (
    <div className="mini-player">
      {/* LEFT */}
      <div className="mini-left">
        <img
          src={currentTrack.image || "https://picsum.photos/100"}
          alt="cover"
          className="mini-cover"
        />
        <div>
          <p className="mini-title">{currentTrack.title}</p>
          <span className="mini-artist">{currentTrack.artist}</span>
        </div>
      </div>

      {/* CENTER */}
      <div className="mini-center">
        <button className="icon-btn">⏮</button>

        {isPlaying ? (
          <button className="play-btn" onClick={pauseTrack}>
            ⏸
          </button>
        ) : (
          <button className="play-btn" onClick={() => playTrack(currentTrack)}>
            ▶
          </button>
        )}

        <button className="icon-btn">⏭</button>

        <div className="progress-wrapper">
          <span className="time">
            {Math.floor(progress / 60)}:
            {String(Math.floor(progress % 60)).padStart(2, "0")}
          </span>

          <input
            type="range"
            min={0}
            max={duration || 0}
            step="0.1"
            value={progress}
            className="progress-bar"
            onChange={(e) => {
              const time = Number(e.target.value);
              setProgress(time);
              audioRef.current.currentTime = time;
            }}
          />

          <span className="time">
            {Math.floor(duration / 60)}:
            {String(Math.floor(duration % 60)).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
