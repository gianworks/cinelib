import { Router } from "express";
import {
  getLibraryMovies,
  getLibraryMovieById,
  createLibraryMovie,
  updateLibraryMovie,
  deleteLibraryMovie,
} from "../controllers/libraryController";

const router = Router();

router.get("/", getLibraryMovies);

router.get("/:id", getLibraryMovieById);

router.post("/", createLibraryMovie);

router.put("/:id", updateLibraryMovie);

router.delete("/:id", deleteLibraryMovie);

export default router;
