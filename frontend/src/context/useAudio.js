import { useContext } from "react";
import { AudioContext } from "./AudioContext";

export const useAudio = () => {
  const context = useContext(AudioContext);

  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }

  return {
    playTrack: context.playTrack,
    pauseTrack: context.pauseTrack,
    currentTrack: context.currentTrack,
    isPlaying: context.isPlaying,
    audioRef: context.audioRef,
  };
};
