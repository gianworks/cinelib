import type { Request, Response } from "express";
import * as libraryService from "../services/libraryService";

export async function getLibraryMovies(req: Request, res: Response) {
  try {
    const movies = await libraryService.getAllMovies();

    res.status(200).json(movies);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch library movies",
    });
  }
}

export async function getLibraryMovieById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const movie = await libraryService.getMovieById(id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(200).json(movie);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch movie",
    });
  }
}

export async function createLibraryMovie(req: Request, res: Response) {
  try {
    const movie = await libraryService.addMovie(req.body);

    res.status(201).json(movie);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add movie",
    });
  }
}

export async function updateLibraryMovie(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const movie = await libraryService.updateMovie(id, req.body);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(200).json(movie);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update movie",
    });
  }
}

export async function deleteLibraryMovie(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    await libraryService.deleteMovie(id);

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete movie",
    });
  }
}
