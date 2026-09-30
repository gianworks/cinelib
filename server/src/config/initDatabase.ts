import pool from "./database";

async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS library_movies (
        id SERIAL PRIMARY KEY,
        tmdb_id INTEGER NOT NULL UNIQUE,
        watch_status VARCHAR(50) NOT NULL DEFAULT 'To Watch',
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        notes TEXT,
        is_favorite BOOLEAN NOT NULL DEFAULT FALSE,
        date_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Database initialized");
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exit(1);
  }
}

export default initDatabase;
