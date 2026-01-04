import express from "express";

const router = express.Router();

/* ---------------- PODCAST LIST ---------------- */
router.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Chill Talks",
      host: "The Stage",
      cover_url: "https://picsum.photos/200?1",
    },
  ]);
});

/* ---------------- EPISODES (THIS WAS MISSING) ---------------- */
router.get("/:id/episodes", (req, res) => {
  const { id } = req.params;

  const episodes = {
    1: [
      {
        id: 1,
        title: "Episode 1: Introduction",
        audio_url:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        duration: "12:30",
      },
      {
        id: 2,
        title: "Episode 2: Deep Conversation",
        audio_url:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        duration: "18:45",
      },
    ],
  };

  res.json(episodes[id] || []);
});

export default router;
