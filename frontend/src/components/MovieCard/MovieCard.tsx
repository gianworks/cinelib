import style from "./MovieCard.module.css";

type MovieCardProps = {
  title: string;
  releaseDate: string;
  posterPath?: string;
};

function MovieCard({ title, releaseDate, posterPath }: MovieCardProps) {
  return (
    <div className={style["movie-card"]}>
      <div className={style["movie-poster"]}>
        <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt="Movie Poster" />
      </div>
      <div className={style["movie-info"]}>
        <p className={style["movie-title"]}>{title}</p>
        <p>{releaseDate}</p>
      </div>
    </div>
  );
}

export default MovieCard;
