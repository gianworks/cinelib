import axios from "axios";

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
};

const API_KEY: string = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL: string = import.meta.env.VITE_TMDB_BASE_URL;

export async function getPopularMovies(): Promise<Movie[]> {
  const response = await axios.get(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
  );
  return response.data.results;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const response = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  );
  return response.data.results;
}
