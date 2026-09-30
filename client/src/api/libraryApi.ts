import axios from "axios";
import type { LibraryMovie } from "../types/LibraryMovie";

const libraryApi = axios.create({
  baseURL: "http://localhost:3000/api/library",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getLibraryMovies(): Promise<LibraryMovie[]> {
  const response = await libraryApi.get("/");
  return response.data;
}

export async function getLibraryMovieById(id: number): Promise<LibraryMovie> {
  const response = await libraryApi.get(`/${id}`);
  return response.data;
}

export async function getLibraryMovieByTmdbId(
  tmdb_id: number,
): Promise<LibraryMovie | null> {
  try {
    const response = await libraryApi.get(`/tmdb/${tmdb_id}`);

    return response.data;
  } catch (error) {
    return null;
  }
}

export async function addLibraryMovie(
  movie: Omit<LibraryMovie, "id" | "date_added">,
): Promise<LibraryMovie> {
  const response = await libraryApi.post("/", movie);
  return response.data;
}

export async function updateLibraryMovie(
  id: number,
  movie: Partial<LibraryMovie>,
): Promise<LibraryMovie> {
  const response = await libraryApi.put(`/${id}`, movie);
  return response.data;
}

export async function deleteLibraryMovie(id: number): Promise<void> {
  await libraryApi.delete(`/${id}`);
}
