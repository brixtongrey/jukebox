import db from "#db/client";
import { createTrack } from "./queries/tracks";
import { createPlaylist } from "./queries/playlists";
import { createPlaylistTrack } from "./queries/playlists_tracks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  
}
