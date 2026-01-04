import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

/* Save / update playback */
router.post("/", async (req, res) => {
  const { user_id, track_id, last_position } = req.body;

  const { data, error } = await supabase
    .from("listening_history")
    .upsert([{ user_id, track_id, last_position, updated_at: new Date() }], {
      onConflict: ["user_id", "track_id"],
    });

  if (error) return res.status(400).json(error);
  res.json({ success: true });
});

/* Get last played track */
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabase
    .from("listening_history")
    .select("track_id, last_position")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .single();

  if (error) return res.json(null);
  res.json(data);
});

export default router;
