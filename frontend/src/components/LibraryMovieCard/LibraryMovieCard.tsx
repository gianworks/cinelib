import { Link } from "react-router-dom";
import style from "./LibraryMovieCard.module.css";
import {
  RiEyeCloseLine,
  RiEyeLine,
  RiEyeFill,
  RiStarLine,
  RiStarFill,
} from "react-icons/ri";

type LibraryMovieCardProps = {
  id: number;
  title: string;
  releaseDate: string;
  watchStatus: string;
  rating: number | null;
  dateAdded: string;
  posterPath?: string | null;
};

function LibraryMovieCard({
  id,
  title,
  releaseDate,
  watchStatus,
  rating,
  dateAdded,
  posterPath,
}: LibraryMovieCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const WatchStatus = ({ status }: { status: string }) => {
    switch (status) {
      case "To Watch":
        return (
          <div className={`${style["watch-status"]} ${style["to-watch"]}`}>
            <RiEyeCloseLine className={style["icon"]} /> {status}
          </div>
        );

      case "Watching":
        return (
          <div className={`${style["watch-status"]} ${style["watching"]}`}>
            <RiEyeLine className={style["icon"]} />
            {status}
          </div>
        );

      case "Watched":
        return (
          <div className={`${style["watch-status"]} ${style["watched"]}`}>
            <RiEyeFill className={style["icon"]} />
            {status}
          </div>
        );

      default:
        return <div className={style["watch-status"]}>Unknown</div>;
    }
  };

  return (
    <Link to={`/movie/${id}`} className={style["library-movie-card"]}>
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
        <p
          className={style["title"]}
        >{`${title} (${new Date(releaseDate).getFullYear()})`}</p>
        <WatchStatus status={watchStatus} />
        <div className={style["icon"]}>
          {rating ? (
            <div className={style["rated"]}>
              {[1, 2, 3, 4, 5].map((star) =>
                star <= rating ? (
                  <RiStarFill key={star} />
                ) : (
                  <RiStarLine key={star} />
                ),
              )}
            </div>
          ) : (
            <div className={style["unrated"]}>
              <RiStarLine />
              <RiStarLine />
              <RiStarLine />
              <RiStarLine />
              <RiStarLine />
            </div>
          )}
        </div>
        <p className={style["date-added"]}>{formatDate(dateAdded)}</p>
      </div>
    </Link>
  );
}

export default LibraryMovieCard;
