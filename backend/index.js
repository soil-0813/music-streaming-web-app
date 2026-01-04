import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import tracksRoutes from "./routes/tracks.js";
import podcastsRoutes from "./routes/podcasts.js";
import categoriesRoutes from "./routes/categories.js";
import playlistsRoutes from "./routes/playlists.js";
import history from "./routes/history.js";

dotenv.config();
const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // if you want cookies/auth
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/tracks", tracksRoutes);
app.use("/podcasts", podcastsRoutes);
app.use("/categories", categoriesRoutes);

app.use("/playlists", playlistsRoutes);

app.use("/history", history);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
