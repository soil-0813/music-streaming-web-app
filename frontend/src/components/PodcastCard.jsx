function PodcastCard({ podcast, onOpen }) {
  return (
    <div className="music-card" onClick={() => onOpen(podcast)}>
      <img src={podcast.cover_url} alt={podcast.title} />
      <h4>{podcast.title}</h4>
      <p>{podcast.host}</p>
    </div>
  );
}

export default PodcastCard;
