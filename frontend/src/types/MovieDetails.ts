
export type MovieDetails = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  runtime: number | null;
  vote_average: number;
  overview: string;
  genres: {
    id: number;
    name: string;
  }[];
};
