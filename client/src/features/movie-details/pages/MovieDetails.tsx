import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import style from "./MovieDetails.module.css";
import Button from "../../../components/Button/Button";
import DropdownButton from "../../../components/DropdownButton/DropdownButton";
import CastCard from "../components/CastCard/CastCard";
import { getMovieCredits, getMovieDetails } from "../../../api/tmdbApi";
import {
  addLibraryMovie,
  getLibraryMovieByTmdbId,
  updateLibraryMovie,
  deleteLibraryMovie,
} from "../../../api/libraryApi";
import type { MovieDetails as MovieDetailsType } from "../../../types/MovieDetails";
import type { MovieCredits } from "../../../types/MovieCredits";
import {
  RiStarLine,
  RiStarSFill,
  RiBookmark3Fill,
  RiEyeCloseLine,
  RiHeart3Line,
  RiHeart3Fill,
  RiBookmark2Fill,
} from "react-icons/ri";

function MovieDetails() {
  const { id } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  const fromLibrary = location.state?.fromLibrary ?? false;

  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [credits, setCredits] = useState<MovieCredits | null>(null);
  const [isInLibrary, setIsInLibrary] = useState(false);
  const [watchStatus, setWatchStatus] = useState<string>("To Watch");
  const [isWatchStatusOpen, setIsWatchStatusOpen] = useState(false);
  const [libraryMovieId, setLibraryMovieId] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const topCrew = credits?.crew
    // .filter((person) => person.job === "Director" || person.job === "Producer")
    .slice(0, 6);
  const topCast = credits?.cast.slice(0, 10);

  const watchStatusOptions = [
    {
      label: "To Watch",
      value: "To Watch",
    },
    {
      label: "Watching",
      value: "Watching",
    },
    {
      label: "Watched",
      value: "Watched",
    },
  ];

  useEffect(() => {
    async function loadMovie() {
      if (!id) return;
      setIsLoading(true);

      try {
        const [movieData, creditsData] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
        ]);

        setMovie(movieData);
        setCredits(creditsData);

        const libraryMovie = await getLibraryMovieByTmdbId(movieData.id);
        if (libraryMovie) {
          setIsInLibrary(true);
          setWatchStatus(libraryMovie.watch_status);
          setLibraryMovieId(libraryMovie.id);
          setIsFavorite(libraryMovie.is_favorite);
          setRating(libraryMovie.rating);
          setNotes(libraryMovie.notes ?? "");
          setSavedNotes(libraryMovie.notes ?? "");
        }

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

  const handleAddToLibrary = async () => {
    if (!movie) return;

    try {
      await addLibraryMovie({
        tmdb_id: movie.id,
        watch_status: "To Watch",
        rating: null,
        notes: null,
        is_favorite: false,
      });

      setIsInLibrary(true);
      console.log("Movie added to library");
    } catch (error) {
      console.error("Failed to add movie:", error);
    }
  };

  const handleWatchStatusChange = async (status: string | null) => {
    if (!libraryMovieId || !status) return;

    try {
      await updateLibraryMovie(libraryMovieId, {
        watch_status: status,
      });

      setWatchStatus(status);
    } catch (error) {
      console.error("Failed to update watch status:", error);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!libraryMovieId) return;

    try {
      await updateLibraryMovie(libraryMovieId, {
        is_favorite: !isFavorite,
      });

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Failed to update favorite:", error);
    }
  };

  const handleRemoveFromLibrary = async () => {
    if (!libraryMovieId) return;

    const confirmed = window.confirm("Remove this movie from your library?");

    if (!confirmed) return;

    try {
      await deleteLibraryMovie(libraryMovieId);

      navigate("/library");
    } catch (error) {
      console.error("Failed to remove movie:", error);
    }
  };

  const handleRatingChange = async (selectedRating: number) => {
    if (!libraryMovieId) return;

    const newRating = rating === selectedRating ? null : selectedRating;

    try {
      await updateLibraryMovie(libraryMovieId, {
        rating: newRating,
      });

      setRating(newRating);
    } catch (error) {
      console.error("Failed to update rating:", error);
    }
  };

  const handleNotesBlur = async () => {
    if (!libraryMovieId) return;

    if (notes === savedNotes) return;

    try {
      await updateLibraryMovie(libraryMovieId, {
        notes,
      });

      setSavedNotes(notes);
    } catch (error) {
      console.error("Failed to update notes:", error);
    }
  };

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
                  {fromLibrary ? (
                    <>
                      <DropdownButton
                        icon={RiEyeCloseLine}
                        label="Watch Status"
                        defaultOption=""
                        options={watchStatusOptions}
                        selectedOption={watchStatus}
                        isOpen={isWatchStatusOpen}
                        onToggle={() =>
                          setIsWatchStatusOpen(!isWatchStatusOpen)
                        }
                        onSelect={handleWatchStatusChange}
                      />
                      <Button
                        variant="secondary"
                        onClick={handleFavoriteToggle}
                        className={`${style["favorite-btn"]} ${
                          isFavorite ? style["favorite-active"] : ""
                        }`}
                      >
                        {isFavorite ? (
                          <RiHeart3Fill className={style["icon"]} />
                        ) : (
                          <RiHeart3Line className={style["icon"]} />
                        )}

                        {isFavorite ? "Favorited" : "Favorite"}
                      </Button>
                      <Button
                        variant="tertiary"
                        onClick={handleRemoveFromLibrary}
                      >
                        <RiBookmark2Fill className={style["icon"]} />
                        Remove
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={handleAddToLibrary}
                      disabled={isInLibrary}
                    >
                      <RiBookmark3Fill className={style["icon"]} />{" "}
                      {isInLibrary ? "Already in Library" : "Add to Library"}
                    </Button>
                  )}
                </div>
                <p>{movie?.overview}</p>
                <div className={style["top-crew-grid"]}>
                  {topCrew?.map((member) => (
                    <div key={`${member.id}-${member.job}`}>
                      <p className={style["crew-member"]}>{member.name}</p>
                      <p>{member.job}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {fromLibrary && (
            <div className={style["review"]}>
              <h2>Your Review</h2>

              <div
                className={style["rating"]}
                role="group"
                aria-label="Rate this movie from 1 to 5 stars"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`${style["rating-star"]} ${
                      rating !== null ? style["rated"] : style["unrated"]
                    }`}
                    onClick={() => handleRatingChange(star)}
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    aria-pressed={rating === star}
                  >
                    {rating !== null && star <= rating ? (
                      <RiStarSFill />
                    ) : (
                      <RiStarLine />
                    )}
                  </button>
                ))}
              </div>

              <textarea
                placeholder="What did you think?"
                className={style["notes"]}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={handleNotesBlur}
              />
            </div>
          )}
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
