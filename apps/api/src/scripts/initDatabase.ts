import "dotenv/config";

import fs from "node:fs";
import path from "node:path";

import pool from "../config/database";

async function initializeDatabase() {
  const schemaPath = path.resolve(
    __dirname,
    "../../database/schema.sql"
  );

  const schema = fs.readFileSync(schemaPath, "utf-8");

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(schema);

    await client.query("COMMIT");

    console.log("PiGenesis database schema initialized successfully.");
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(
      "PiGenesis database schema initialization failed:",
      error
    );

    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

initializeDatabase();