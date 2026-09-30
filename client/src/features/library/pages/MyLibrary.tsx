import { useEffect, useState } from "react";
import style from "./MyLibrary.module.css";
import SearchBar from "../../../components/SearchBar/SearchBar";
import LibraryMovieCard from "../components/LibraryMovieCard/LibraryMovieCard";
import type { LibraryMovie } from "../../../types/LibraryMovie";
import type { MovieDetails } from "../../../types/MovieDetails";
import { getLibraryMovies } from "../../../api/libraryApi";
import { getMovieDetails } from "../../../api/tmdbApi";

type LibraryMovieWithDetails = {
  library: LibraryMovie;
  movie: MovieDetails;
};

function MyLibrary() {
  const [movies, setMovies] = useState<LibraryMovieWithDetails[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadLibrary() {
      setIsLoading(true);

      try {
        const libraryMovies = await getLibraryMovies();
        const moviesWithDetails = await Promise.all(
          libraryMovies.map(async (libraryMovie) => {
            const movie = await getMovieDetails(
              libraryMovie.tmdb_id.toString(),
            );

            return {
              library: libraryMovie,
              movie,
            };
          }),
        );

        setMovies(moviesWithDetails);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Failed to load library movies..");
      } finally {
        setIsLoading(false);
      }
    }

    loadLibrary();
  }, []);

  return (
    <div className={style.main}>
      <SearchBar
        placeholder="Search movies in your library..."
        onSearch={() => {}}
        onSubmit={() => {}}
      />
      <h1>My Library</h1>

      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <div className="loading">Loading..</div>
      ) : (
        <div className={style["movie-grid"]}>
          {movies.map((item) => (
            <LibraryMovieCard
              id={item.movie.id}
              tmdbId={item.library.tmdb_id}
              title={item.movie.title}
              releaseDate={item.movie.release_date}
              watchStatus={item.library.watch_status}
              rating={item.library.rating}
              dateAdded={item.library.date_added}
              posterPath={item.movie.poster_path}
              key={item.movie.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyLibrary;
