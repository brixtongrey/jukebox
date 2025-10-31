import db from "#db/client";

export async function createPlaylistTrack(playlistId, trackId) {
    const sql = `
    INSTER INTO playlists_tracks (playlist_id, track_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
    RETURNING *
    `;
    const { rows: [playlistTrack] } = await db.query(sql, [playlistId, trackId]);
    return playlistTrack;
}

export async function getTracksByPlaylistId(playlistId) {
    const sql = `
    SELECT tracks.*
    FROM tracks
    JOIN playlists_tracks ON tracks.id = playlists_tracks.track_id
    WHERE playlists_tracks.playlist_id = $1
    `;
    const { rows: tracks } = await db.query(sql, [playlistId]);
    return tracks;
}