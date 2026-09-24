import style from "./MovieCard.module.css";

type MovieCardProps = {
  title: string;
  releaseDate: string;
  posterPath?: string | null;
};

function MovieCard({ title, releaseDate, posterPath }: MovieCardProps) {
  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className={style["movie-card"]}>
      <div className={style["movie-poster"]}>
        <img
          src={posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : undefined}
          alt={`${title} Poster`}
        />
      </div>
      <div className={style["movie-info"]}>
        <p className={style["movie-title"]}>{title}</p>
        <p>{formatDate(releaseDate)}</p>
      </div>
    </div>
  );
}

export default MovieCard;
