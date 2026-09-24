import { RiSearchLine } from "react-icons/ri";
import style from "./SearchBar.module.css";

type SearchBarProps = {
  placeholder: string;
  onSearch: (query: string) => void;
};

function SearchBar({ placeholder, onSearch }: SearchBarProps) {
  return (
    <div className={style["search-bar"]}>
      <RiSearchLine className={style["search-icon"]} />
      <input
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
