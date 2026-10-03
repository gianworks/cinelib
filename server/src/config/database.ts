import { Pool, Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

// const databaseUrl = new URL(process.env.DATABASE_URL!);
// const databaseName = databaseUrl.pathname.slice(1);

// async function initializeDatabase() {
//   const adminUrl = new URL(databaseUrl);
//   adminUrl.pathname = "/postgres";
//   const client = new Client({ connectionString: adminUrl.toString() });
//   try {
//     await client.connect();
//     const result = await client.query(
//       "SELECT 1 FROM pg_database WHERE datname = $1",
//       [databaseName],
//     );
//     if (result.rowCount === 0) {
//       await client.query(`CREATE DATABASE "${databaseName}"`);
//       console.log(`Database "${databaseName}" created.`);
//     } else {
//       console.log(`Database "${databaseName}" already exists.`);
//     }
//   } catch (error) {
//     console.error("Database creation failed:", error);
//     process.exit(1);
//   } finally {
//     await client.end();
//   }
// }

// export async function initializeDatabaseConnection() {
//   await initializeDatabase();
// }

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
