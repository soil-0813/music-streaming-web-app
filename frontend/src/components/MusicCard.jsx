import chillBeatsImg from "../assets/chill-beats.png";

function MusicCard({ track, onPlay }) {
  return (
    <div
      onClick={() => onPlay(track)}
      className="glass-dark p-4 cursor-pointer hover:scale-105 transition"
    >
      <img src={chillBeatsImg} alt={track.title} className="rounded-xl mb-3" />
      <h4 className="font-semibold">{track.title}</h4>
      <p className="text-sm opacity-70">{track.artist}</p>
    </div>
  );
}
export default MusicCard;
