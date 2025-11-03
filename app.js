import express from "express";
const app = express();

app.use(express.json());

import tracksRouter from "./db/routes/tracks.js";
import playlistsRouter from "./db/routes/playlists.js";

app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);

export default app;
