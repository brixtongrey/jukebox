import express from "express";
import { getPlaylists, createPlaylist, getPlaylistById } from "./db/queries/playlists.js";

import { createPlaylistTrack, getTracksByPlaylistId } from "#db/queries/playlists_tracks";

const router = express.Router();

// GET /playlists
router.get("/", async (req, res) => {
  const playlists = await getPlaylists();
  res.send(playlists);
});

// // POST /playlists
// router.post("/", async (req, res) => {
//   const playlist = await createPlaylist();
//   res.status(201).send(playlist);
// });

router.post("/", async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).send("name and description are required.");
  }

  const playlist = await createPlaylist(name, description);
  res.status(201).send(playlist);
});

// Validate /playlists/:id
router.param("id", async (req, res, next, id) => {
  if (isNaN(id)) return res.status(400).send("id must be a number.");

  const playlist = await getPlaylistById(id);
  if (!playlist) return res.status(404).send("Playlist not found.");

  req.playlist = playlist;
  next();
});

// GET /playlists/:id — sends playlist specified by id
router.get("/:id", (req, res) => {
  res.send(req.playlist);
});

// GET /playlists/:id/tracks — sends all tracks in a playlist
router.get("/:id/tracks", async (req, res) => {
  const tracks = await getTracksByPlaylistId(req.playlist.id);
  res.send(tracks);
});

// POST /playlists/:id/tracks — adds a track to the playlist
router.post("/:id/tracks", async (req, res) => {
  const { trackId } = req.body;

  if (!trackId) {
    return res.status(400).send("trackId required in request body.");
  }

  const playlistTrack = await createPlaylistTrack(req.playlist.id, trackId);
  res.status(201).send(playlistTrack);
});


export default router;
