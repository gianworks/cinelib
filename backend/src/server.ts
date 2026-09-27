import app from "./app";
import dotenv from "dotenv";
import initDatabase from "./config/initDatabase";

dotenv.config();

const PORT = process.env.PORT;

async function startServer() {
  await initDatabase();
  
  app.listen(PORT, () => {
    console.log(`CineLib API running on port ${PORT}`);
  });
}

startServer();
