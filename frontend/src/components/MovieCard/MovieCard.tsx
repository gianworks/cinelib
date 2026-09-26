import { Link } from "react-router-dom";
import style from "./MovieCard.module.css";

type MovieCardProps = {
  id: number;
  title: string;
  releaseDate: string;
  posterPath?: string | null;
};

function MovieCard({ id, title, releaseDate, posterPath }: MovieCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Link to={`/movie/${id}`} className={style["movie-card"]}>
      <div className={style["poster"]}>
        <img
          src={
            posterPath
              ? `https://image.tmdb.org/t/p/w500${posterPath}`
              : undefined
          }
          alt={`${title} Poster`}
        />
      </div>
      <div className={style["info"]}>
        <p className={style["title"]}>{title}</p>
        <p>{formatDate(releaseDate)}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
