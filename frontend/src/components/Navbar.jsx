import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-black text-white">
      <Link to="/dashboard">Home</Link>
      <Link to="/music">Music</Link>
      <Link to="/podcasts">Podcasts</Link>

      {/* 👇 ADD THIS */}
      <Link to="/playlists">Playlists</Link>
    </nav>
  );
}
