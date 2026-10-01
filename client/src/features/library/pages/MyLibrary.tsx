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

type LibraryTab = "All" | "To Watch" | "Watching" | "Watched" | "Favorites";

function MyLibrary() {
  const [movies, setMovies] = useState<LibraryMovieWithDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<LibraryTab>("All");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const tabs: LibraryTab[] = [
    "All",
    "To Watch",
    "Watching",
    "Watched",
    "Favorites",
  ];

  const filteredMovies = movies.filter((item) => {
    if (activeTab !== "All") {
      if (activeTab === "Favorites") {
        if (!item.library.is_favorite) {
          return false;
        }
      } else if (item.library.watch_status !== activeTab) {
        return false;
      }
    }
    if (searchQuery.trim()) {
      return item.movie.title
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());
    }
    return true;
  });

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
        onSearch={(query) => setSearchQuery(query)}
        onSubmit={(event) => event.preventDefault()}
      />

      <h1>My Library</h1>

      <div className={style.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`${style.tab} ${activeTab === tab ? style["active-tab"] : ""}`}
            onClick={() => setActiveTab(tab)}
            aria-pressed={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </div>

      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <div className="loading">Loading..</div>
      ) : (
        <div className={style["movie-grid"]}>
          {filteredMovies.length > 0 ? (
            filteredMovies.map((item) => (
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
            ))
          ) : (
            <p className={style["empty-message"]}>
              No movies in this category yet.
            </p>
          )}{" "}
        </div>
      )}
    </div>
  );
}

export default MyLibrary;
