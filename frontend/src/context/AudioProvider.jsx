import { useRef, useState, useEffect } from "react";
import { AudioContext } from "./AudioContext";

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(new Audio());

  const savedTrack = JSON.parse(localStorage.getItem("lastTrack"));
  const savedPosition = Number(localStorage.getItem("lastPosition")) || 0;

  const [currentTrack, setCurrentTrack] = useState(savedTrack);
  const [isPlaying, setIsPlaying] = useState(false);

  // 🔹 Apply track ONLY when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.src = currentTrack.audio_url;
    audio.currentTime = savedPosition;

    const handleTimeUpdate = () => {
      localStorage.setItem("lastPosition", Math.floor(audio.currentTime));
    };

    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrack]); // ✅ FIXED

  // ▶️ Play
  const playTrack = (track) => {
    const audio = audioRef.current;

    if (!currentTrack || currentTrack.audio_url !== track.audio_url) {
      setCurrentTrack(track);
      localStorage.setItem("lastTrack", JSON.stringify(track));
      localStorage.setItem("lastPosition", 0);
    }

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch((e) => console.warn("Play blocked:", e.message));
  };

  // ⏸ Pause
  const pauseTrack = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <AudioContext.Provider
      value={{
        audioRef,
        currentTrack,
        isPlaying,
        playTrack,
        pauseTrack,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
