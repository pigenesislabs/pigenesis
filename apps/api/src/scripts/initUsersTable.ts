import { Client } from "pg";
import databaseConfig from "../config/databaseConfig";

const client = new Client({
  host: databaseConfig.host,
  port: databaseConfig.port,
  database: databaseConfig.name,
  user: databaseConfig.user,
  password: databaseConfig.password,
});

const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    status TEXT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT users_status_check
        CHECK (
            status IN (
                'Active',
                'Invited',
                'Suspended',
                'Disabled'
            )
        )
);

CREATE INDEX IF NOT EXISTS idx_users_email
    ON users (email);

CREATE INDEX IF NOT EXISTS idx_users_status
    ON users (status);
`;

async function initializeUsersTable(): Promise<void> {
  try {
    await client.connect();

    await client.query(createUsersTable);

    console.log("PiGenesis users table initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize users table:", error);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

initializeUsersTable();