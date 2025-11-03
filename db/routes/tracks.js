import express from "express";
import { getTracks, getTrackById } from "#db/queries/tracks";

const router = express.Router();

// GET /tracks — send array of all tracks
router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

// Param middleware to validate /tracks/:id
router.param("id", async (req, res, next, id) => {
  const track = await getTrackById(id);
  if (!track) return res.status(404).send("Track not found.");

  req.track = track;
  next();
});

// GET /tracks/:id — send track specified by id
router.get("/:id", (req, res) => {
  res.send(req.track);
});

export default router;