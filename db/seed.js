import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  try {
    console.log("Dropping tables...")
    await db.query(`
      DROP TABLE IF EXISTS playlists_tracks;
      DROP TABLE IF EXISTS playlists;
      DROP TABLE IF EXISTS tracks;
      `);

      console.log("Creating tables...");
      await db.query(`
        CREATE TABLE playlists (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT NOT NULL
        );

        CREATE TABLE tracks (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          duration_ms INTEGER NOT NULL
        );

        CREATE TABLE playlists_tracks (
          id SERIAL PRIMARY KEY,
          playlist_id INTEGER NOT NULL playlists(id) ON DELETE CASCADE,
          track_id INTEGER NOT NULL tracks(id) ON DELETE CASCADE,
          CONSTRAINT unique_playlist_track UNIQUE (playlist_id, track_id)
        );
        `);
  } catch (error) {

  }
}
