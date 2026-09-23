import style from "./SearchBar.module.css";

type SearchBarProps = {
  placeholder: string;
  onSearch: (query: string) => void;
};

function SearchBar({ placeholder, onSearch }: SearchBarProps) {
  return (
    <div className={style["search-bar"]}>
      <input
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
