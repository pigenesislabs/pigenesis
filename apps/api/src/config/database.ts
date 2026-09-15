import { Pool } from "pg";
import databaseConfig from "./databaseConfig";

const pool = new Pool({
  host: databaseConfig.host,
  port: databaseConfig.port,
  database: databaseConfig.name,
  user: databaseConfig.user,
  password: databaseConfig.password,
});

export default pool;