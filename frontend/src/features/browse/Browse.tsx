import SearchBar from "../../components/SearchBar";
import style from "./Browse.module.css";

function Browse() {
  return(
    <div className={style.main}>
      <SearchBar placeholder="Search movies..." onSearch={() => {}} />
      <h1>Popular Movies</h1>
    </div>
  );
}

export default Browse;
