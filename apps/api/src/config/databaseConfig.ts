import "dotenv/config";

const databaseConfig = {
  host: process.env.DB_HOST ?? "localhost",
  port: process.env.DB_PORT
    ? Number(process.env.DB_PORT)
    : 5432,
  name: process.env.DB_NAME ?? "pigenesis",
  user: process.env.DB_USER ?? "postgres",
  password: process.env.DB_PASSWORD ?? "",
} as const;

export default databaseConfig;