import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

/* ---------------- CREATE PLAYLIST ---------------- */
router.post("/", async (req, res) => {
  const { user_id, name, description } = req.body;

  const { data, error } = await supabase
    .from("playlists")
    .insert([{ user_id, name, description }])
    .select()
    .single();

  if (error) return res.status(400).json(error);
  res.json(data);
});

/* ---------------- GET USER PLAYLISTS ---------------- */
/* later: user_id should come from auth middleware */
router.get("/", async (req, res) => {
  const { user_id } = req.query;

  let query = supabase.from("playlists").select("*");

  // only filter if user_id exists
  if (user_id) {
    query = query.eq("user_id", user_id);
  }

  const { data, error } = await query;

  if (error) return res.status(400).json(error);
  res.json(data);
});

/* ---------------- GET PLAYLIST TRACKS ---------------- */
router.get("/:playlistId/tracks", async (req, res) => {
  const { playlistId } = req.params;

  const { data, error } = await supabase
    .from("playlist_tracks")
    .select("tracks(*)")
    .eq("playlist_id", playlistId);

  if (error) return res.status(400).json(error);

  res.json(data.map((item) => item.tracks));
});

/* ---------------- ADD TRACK TO PLAYLIST ---------------- */
router.post("/:playlistId/tracks", async (req, res) => {
  const { playlistId } = req.params;
  const { track_id } = req.body;

  const { error } = await supabase
    .from("playlist_tracks")
    .insert([{ playlist_id: playlistId, track_id }]);

  if (error) return res.status(400).json(error);
  res.json({ success: true });
});

/* ---------------- REMOVE TRACK FROM PLAYLIST ---------------- */
router.delete("/:playlistId/tracks/:trackId", async (req, res) => {
  const { playlistId, trackId } = req.params;

  const { error } = await supabase
    .from("playlist_tracks")
    .delete()
    .eq("playlist_id", playlistId)
    .eq("track_id", trackId);

  if (error) return res.status(400).json(error);
  res.json({ success: true });
});

export default router;
