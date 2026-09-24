import { RiSearchLine } from "react-icons/ri";
import style from "./SearchBar.module.css";

type SearchBarProps = {
  placeholder: string;
  onSearch: (query: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

function SearchBar({ placeholder, onSearch, onSubmit }: SearchBarProps) {
  return (
    <form onSubmit={onSubmit} className={style["search-bar"]}>
      <RiSearchLine className={style["search-icon"]} />
      <input
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
      />
    </form>
  );
}

export default SearchBar;
