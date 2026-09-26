import axios from "axios";
import type { Movie } from "../types/movie";
import type { MovieDetails } from "../types/MovieDetails";
import type { MovieCredits } from "../types/MovieCredits";

const API_KEY: string = import.meta.env.VITE_TMDB_API_KEY;
const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
  },
});

export async function searchMovies(query: string): Promise<Movie[]> {
  const response = await tmdbApi.get("/search/movie", {
    params: {
      query,
    },
  });
  return response.data.results;
}

export async function discoverMovies(filters?: {
  genre?: string;
  year?: string;
  sortBy?: string;
}): Promise<Movie[]> {
  const response = await tmdbApi.get("/discover/movie", {
    params: {
      with_genres: filters?.genre,
      primary_release_year: filters?.year,
      sort_by: filters?.sortBy,
    },
  });
  return response.data.results;
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  const response = await tmdbApi.get(`/movie/${id}`);
  return response.data;
}

export async function getMovieCredits(id: string): Promise<MovieCredits> {
  const response = await tmdbApi.get(`/movie/${id}/credits`);
  return response.data;
}
