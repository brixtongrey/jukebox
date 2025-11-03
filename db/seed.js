import db from "#db/client";
import { createTrack } from "./queries/tracks.js";
import { createPlaylist } from "./queries/playlists.js";
import { createPlaylistTrack } from "./queries/playlists_tracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO create 20 tracks
  for (let i = 1; i <= 20; i++) {
    await createTrack("Track " + i, 18000 + i);
  }

// TODO create 10 playlists
  for (let i = 1; i <= 10; i++) {
    await createPlaylist("Playlist " + i, "Playlist number " + i);
  }

  // TODO create 15 playlist-track associations randomly
    for (let i = 1; i <= 15; i++) {
      const playlistId = 1 + Math.floor(Math.random() * 10);
      const trackId = 1 + Math.floor(Math.random() * 20);
      await createPlaylistTrack(playlistId, trackId);
    }
}
