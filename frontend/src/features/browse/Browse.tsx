import { useState, useEffect, useRef } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import DropdownButton from "../../components/DropdownButton/DropdownButton";
import MovieCard from "../../components/MovieCard/MovieCard";
import style from "./Browse.module.css";
import {
  RiFunctionLine,
  RiCalendarLine,
  RiArrowUpDownLine,
} from "react-icons/ri";
import { getPopularMovies, searchMovies } from "../../services/tmdbAPI";
import type { Movie } from "../../services/tmdbAPI";

function Browse() {
  const genres = ["Action", "Adventure", "Horror", "Sci-Fi"];
  const years = ["2026", "2025", "2024", "2023"];
  const sortOptions = ["Popularity", "Rating", "Release Date", "Title"];

  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  const loadMovies = async () => {
    setIsLoading(true);
    
    try {
      const movies = searchQuery.trim()
        ? await searchMovies(searchQuery)
        : await getPopularMovies();
      setMovies(movies);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to load movies..");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loadMovies();
  };

  const handleToggle = (dropdown: string) =>
    setActiveDropdown((current) => (current === dropdown ? null : dropdown));

  useEffect(() => {
    loadMovies();
  }, []);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) =>
      filtersRef.current &&
      !filtersRef.current.contains(e.target as Node) &&
      setActiveDropdown(null);

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={style.main}>
      <SearchBar
        placeholder="Search movies..."
        onSearch={setSearchQuery}
        onSubmit={handleSearch}
      />

      <div className={style["section-header"]}>
        <h1>Popular Movies</h1>
        <div ref={filtersRef} className={style.filters}>
          <DropdownButton
            icon={RiFunctionLine}
            label="Genre"
            options={genres}
            selectedOption={selectedGenre}
            isOpen={activeDropdown === "genre"}
            onToggle={() => handleToggle("genre")}
            onSelect={setSelectedGenre}
          />
          <DropdownButton
            icon={RiCalendarLine}
            label="Year"
            options={years}
            selectedOption={selectedYear}
            isOpen={activeDropdown === "year"}
            onToggle={() => handleToggle("year")}
            onSelect={setSelectedYear}
          />
          <DropdownButton
            icon={RiArrowUpDownLine}
            label="Sort By"
            options={sortOptions}
            selectedOption={selectedSort}
            isOpen={activeDropdown === "sort"}
            onToggle={() => handleToggle("sort")}
            onSelect={setSelectedSort}
          />
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <div className="loading">Loading..</div>
      ) : (
        <div className={style["movie-grid"]}>
          {movies.map((movie) => (
            <MovieCard
              title={movie.title}
              releaseDate={movie.release_date}
              posterPath={movie.poster_path}
              key={movie.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Browse;
