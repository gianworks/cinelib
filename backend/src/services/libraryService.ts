import pool from "../config/database";
import type {
  CreateLibraryMovie,
  UpdateLibraryMovie,
} from "../models/libraryMovie";

export async function getAllMovies() {
  const result = await pool.query(
    `
    SELECT *
    FROM library_movies
    ORDER BY date_added DESC
    `,
  );

  return result.rows;
}

export async function getMovieById(id: number) {
  const result = await pool.query(
    `
    SELECT *
    FROM library_movies
    WHERE id = $1
    `,
    [id],
  );

  return result.rows[0];
}

export async function addMovie(movie: CreateLibraryMovie) {
  const result = await pool.query(
    `
    INSERT INTO library_movies
    (
      tmdb_id,
      watch_status,
      rating,
      notes,
      is_favorite
    )
    VALUES
    ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [
      movie.tmdb_id,
      movie.watch_status,
      movie.rating ?? null,
      movie.notes ?? null,
      movie.is_favorite ?? false,
    ],
  );

  return result.rows[0];
}

export async function updateMovie(id: number, movie: UpdateLibraryMovie) {
  const result = await pool.query(
    `
    UPDATE library_movies
    SET
      watch_status = COALESCE($1, watch_status),
      rating = COALESCE($2, rating),
      notes = COALESCE($3, notes),
      is_favorite = COALESCE($4, is_favorite)
    WHERE id = $5
    RETURNING *
    `,
    [movie.watch_status, movie.rating, movie.notes, movie.is_favorite, id],
  );

  return result.rows[0];
}

export async function deleteMovie(id: number) {
  await pool.query(
    `
    DELETE FROM library_movies
    WHERE id = $1
    `,
    [id],
  );
}
