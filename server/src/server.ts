import app from "./app";
import dotenv from "dotenv";
import { initializeDatabaseConnection } from "./config/database";
import initDatabase from "./config/initDatabase";

dotenv.config();

const PORT = process.env.PORT;

async function startServer() {
  await initializeDatabaseConnection();
  await initDatabase();

  app.listen(PORT, () => {
    console.log(`CineLib API running on port ${PORT}`);
  });
}

startServer();
