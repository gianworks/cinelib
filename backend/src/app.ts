import express from "express";
import cors from "cors";
import libraryRoutes from "./routes/libraryRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/library", libraryRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "CineLib API is running",
  });
});

export default app;
