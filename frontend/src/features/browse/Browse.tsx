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
import { searchMovies, discoverMovies } from "../../services/tmdbApi";
import type { Movie } from "../../types/movie";

function Browse() {
  const genres = [
    { label: "Action", value: "28" },
    { label: "Adventure", value: "12" },
    { label: "Animation", value: "16" },
    { label: "Comedy", value: "35" },
    { label: "Crime", value: "80" },
    { label: "Documentary", value: "99" },
    { label: "Drama", value: "18" },
    { label: "Family", value: "10751" },
    { label: "Fantasy", value: "14" },
    { label: "History", value: "36" },
    { label: "Horror", value: "27" },
    { label: "Music", value: "10402" },
    { label: "Mystery", value: "9648" },
    { label: "Romance", value: "10749" },
    { label: "Science Fiction", value: "878" },
    { label: "TV Movie", value: "10770" },
    { label: "Thriller", value: "53" },
    { label: "War", value: "10752" },
    { label: "Western", value: "37" },
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, index) => {
    const year = currentYear - index;

    return {
      label: String(year),
      value: String(year),
    };
  });
  const sortOptions = [
    // {
    //   label: "Popularity",
    //   value: "popularity.desc",
    // },
    {
      label: "Rating",
      value: "vote_average.desc",
    },
    {
      label: "Release Date",
      value: "primary_release_date.desc",
    },
  ];

  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadMovies();
  }, [selectedGenre, selectedYear, selectedSort]);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) =>
      filtersRef.current &&
      !filtersRef.current.contains(e.target as Node) &&
      setActiveDropdown(null);

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const loadMovies = async () => {
    setIsLoading(true);

    try {
      let movies: Movie[];

      if (searchQuery.trim()) {
        movies = await searchMovies(searchQuery);
      } else {
        movies = await discoverMovies({
          genre: selectedGenre ?? undefined,
          year: selectedYear ?? undefined,
          sortBy: selectedSort ?? "popularity.desc",
        });
      }

      movies = applyFilters(movies);
      setMovies(movies);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to load movies..");
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = (movies: Movie[]) => {
    let filteredMovies = [...movies];

    if (selectedGenre) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.genre_ids?.includes(Number(selectedGenre)),
      );
    }

    if (selectedYear) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.release_date?.startsWith(selectedYear),
      );
    }

    return filteredMovies;
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loadMovies();
  };

  const handleToggle = (dropdown: string) =>
    setActiveDropdown((current) => (current === dropdown ? null : dropdown));

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
            defaultOption="All"
            options={genres}
            selectedOption={selectedGenre}
            isOpen={activeDropdown === "genre"}
            onToggle={() => handleToggle("genre")}
            onSelect={setSelectedGenre}
          />
          <DropdownButton
            icon={RiCalendarLine}
            label="Year"
            defaultOption="All"
            options={years}
            selectedOption={selectedYear}
            isOpen={activeDropdown === "year"}
            onToggle={() => handleToggle("year")}
            onSelect={setSelectedYear}
          />
          <DropdownButton
            icon={RiArrowUpDownLine}
            label="Popularity"
            defaultOption="Popularity"
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
              id={movie.id}
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
