import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Tracks from "./pages/Tracks";
import Podcasts from "./pages/Podcasts";
import PodcastDetail from "./pages/PodcastDetail";
import MiniPlayer from "./components/MiniPlayer";
import Playlists from "./pages/Playlists";
import PlaylistDetail from "./pages/PlaylistDetail";
import Search from "./pages/Search";
import Library from "./pages/Library";

function AppLayout({ tracks, podcasts }) {
  const location = useLocation();

  // pages where MiniPlayer should NOT appear
  const hideMiniPlayerRoutes = ["/", "/login", "/signup"];

  const hideMiniPlayer = hideMiniPlayerRoutes.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tracks" element={<Tracks />} />
        <Route path="/podcasts" element={<Podcasts />} />
        <Route path="/podcasts/:id" element={<PodcastDetail />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlists/:id" element={<PlaylistDetail />} />
        <Route path="/library" element={<Library />} />

        <Route
          path="/search"
          element={<Search tracks={tracks} podcasts={podcasts} />}
        />
      </Routes>

      {/* ✅ MiniPlayer ONLY where needed */}
      {!hideMiniPlayer && <MiniPlayer />}
    </>
  );
}

function App() {
  const [tracks, setTracks] = useState([]);
  const [podcasts, setPodcasts] = useState([]);

  // ✅ fetch tracks once
  useEffect(() => {
    fetch("http://localhost:5000/tracks")
      .then((res) => res.json())
      .then((data) => setTracks(data))
      .catch(console.error);

    fetch("http://localhost:5000/podcasts")
      .then((res) => res.json())
      .then((data) => setPodcasts(data))
      .catch(console.error);
  }, []);

  return (
    <Router>
      <AppLayout tracks={tracks} podcasts={podcasts} />
    </Router>
  );
}

export default App;
