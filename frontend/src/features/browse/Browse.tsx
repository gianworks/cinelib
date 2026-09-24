import { useState, useEffect, useRef } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import DropdownButton from "../../components/DropdownButton/DropdownButton";
import style from "./Browse.module.css";
import { RiFunctionLine, RiCalendarLine, RiArrowUpDownLine } from "react-icons/ri";
import MovieCard from "../../components/MovieCard/MovieCard";

function Browse() {
  const genres = ["Action", "Adventure", "Horror", "Sci-Fi"];
  const years = ["2026", "2025", "2024", "2023"];
  const sortOptions = ["Popularity", "Rating", "Release Date", "Title"];

  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const filtersRef = useRef<HTMLDivElement>(null);

  function handleToggle(dropdown: string) {
    setActiveDropdown((current) => (current === dropdown ? null : dropdown));
  }

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
      <SearchBar placeholder="Search movies..." onSearch={() => {}} />
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
      <div className={style["movie-grid"]}>
        <MovieCard title="Interstellar" releaseDate="September 24, 2026" />
      </div>
    </div>
  );
}

export default Browse;
