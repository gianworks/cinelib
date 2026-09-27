import { Router } from "express";
import {
  getLibraryMovies,
  getLibraryMovieById,
  createLibraryMovie,
  updateLibraryMovie,
  deleteLibraryMovie,
  getLibraryMovieByTmdbId
} from "../controllers/libraryController";

const router = Router();

router.get("/", getLibraryMovies);

router.get("/:id", getLibraryMovieById);

router.get("/tmdb/:tmdb_id", getLibraryMovieByTmdbId);

router.post("/", createLibraryMovie);

router.put("/:id", updateLibraryMovie);

router.delete("/:id", deleteLibraryMovie);

export default router;
