import { useState, useEffect, act } from "react";
import { useParams } from "react-router-dom";
import type { MovieDetails } from "../../types/MovieDetails";
import type { MovieCredits } from "../../types/MovieCredits";
import { getMovieCredits, getMovieDetails } from "../../services/tmdbApi";
import style from "./MovieDetails.module.css";
import { RiStarSFill, RiBookmark3Fill } from "react-icons/ri";
import Button from "../../components/Button/Button";
import CastCard from "../../components/CastCard/CastCard";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<MovieCredits | null>(null);

  const topCrew = credits?.crew
    .filter((person) => person.job === "Director" || "Producer")
    .slice(0, 6);
  const topCast = credits?.cast.slice(0, 10);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadMovie() {
      if (!id) return;
      setIsLoading(true);

      try {
        const movieData = await getMovieDetails(id);
        const creditsData = await getMovieCredits(id);

        setMovie(movieData);
        setCredits(creditsData);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Failed to load movies..");
      } finally {
        setIsLoading(false);
      }
    }

    loadMovie();
  }, [id]);

  const formatDate = (date: string | null) => {
    if (!date) return "N/A";

    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
  };

  const formatList = (items: string[]): string => {
    if (items.length === 0) return "N/A";

    if (items.length === 1) {
      return items[0];
    }
    if (items.length === 2) {
      return `${items[0]} and ${items[1]}`;
    }

    return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
  };

  const formatRuntime = (minutes: number | null) => {
    if (!minutes) return "N/A";

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return `${hours}h ${mins}m`;
  };

  return (
    <div className={style["main"]}>
      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <div className="loading">Loading..</div>
      ) : (
        <>
          <div className={style["hero"]}>
            <img
              src={
                movie?.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                  : undefined
              }
              alt={`${movie?.title} Backdrop`}
              className={style["backdrop"]}
            />
            <div className={style["overlay"]}></div>
            <div className={style["details"]}>
              <img
                src={
                  movie?.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
                    : undefined
                }
                alt={`${movie?.title} Poster`}
                className={style["poster"]}
              />
              <div className={style["content"]}>
                <div className={style["heading"]}>
                  <div className={style["title"]}>
                    <h1>{movie?.title}</h1>
                    <p>
                      {formatDate(movie?.release_date ?? null)}
                      {" • "}
                      {formatList(
                        movie?.genres.map((genre) => genre.name) ?? [],
                      )}
                      {" • "}
                      {formatRuntime(movie?.runtime ?? null)}
                    </p>
                  </div>
                  <p className={style["tmdb-rating"]}>
                    <RiStarSFill className={style["icon"]} />{" "}
                    {movie?.vote_average.toFixed(1)} TMDB Rating
                  </p>
                </div>
                <div className={style["actions"]}>
                  <Button variant="primary">
                    <RiBookmark3Fill className={style["icon"]} /> Add to Library
                  </Button>
                </div>
                <p>{movie?.overview}</p>
                <div className={style["top-crew-grid"]}>
                  {topCrew?.map((member) => (
                    <div key={member.id}>
                      <p className={style["crew-member"]}>{member.name}</p>
                      <p>{member.job}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={style["top-cast"]}>
            <h2>Top Cast</h2>
            <div className={style["top-cast-grid"]}>
              {topCast?.map((cast) => (
                <CastCard
                  name={cast.name}
                  character={cast.character}
                  profilePath={cast.profile_path}
                  key={cast.id}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
