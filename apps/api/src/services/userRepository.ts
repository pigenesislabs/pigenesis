import pool from "../config/database";

export type UserStatus =
  | "Active"
  | "Invited"
  | "Suspended"
  | "Disabled";

export type UserRecord = {
  id: string;
  email: string;
  displayName: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
};

type UserRow = {
  id: string;
  email: string;
  display_name: string;
  status: UserStatus;
  created_at: Date;
  updated_at: Date;
};

function mapUser(row: UserRow): UserRecord {
  return {
    id: row.id,
    email: row.email,
    displayName: row.display_name,
    status: row.status,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

export async function findAllUsers(): Promise<UserRecord[]> {
  const result = await pool.query<UserRow>(`
    SELECT
      id,
      email,
      display_name,
      status,
      created_at,
      updated_at
    FROM users
    ORDER BY created_at ASC
  `);

  return result.rows.map(mapUser);
}

export async function findUserById(
  userId: string
): Promise<UserRecord | null> {
  const result = await pool.query<UserRow>(
    `
      SELECT
        id,
        email,
        display_name,
        status,
        created_at,
        updated_at
      FROM users
      WHERE id = $1
    `,
    [userId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapUser(result.rows[0]);
}

export async function findUserByEmail(
  email: string
): Promise<UserRecord | null> {
  const result = await pool.query<UserRow>(
    `
      SELECT
        id,
        email,
        display_name,
        status,
        created_at,
        updated_at
      FROM users
      WHERE email = $1
    `,
    [email]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapUser(result.rows[0]);
}

export async function insertUser(input: {
  id: string;
  email: string;
  displayName: string;
  status: UserStatus;
}): Promise<UserRecord> {
  const result = await pool.query<UserRow>(
    `
      INSERT INTO users (
        id,
        email,
        display_name,
        status
      )
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        email,
        display_name,
        status,
        created_at,
        updated_at
    `,
    [
      input.id,
      input.email,
      input.displayName,
      input.status,
    ]
  );

  return mapUser(result.rows[0]);
}

export async function updateUser(
  userId: string,
  input: {
    email: string;
    displayName: string;
    status: UserStatus;
  }
): Promise<UserRecord | null> {
  const result = await pool.query<UserRow>(
    `
      UPDATE users
      SET
        email = $1,
        display_name = $2,
        status = $3,
        updated_at = NOW()
      WHERE id = $4
      RETURNING
        id,
        email,
        display_name,
        status,
        created_at,
        updated_at
    `,
    [
      input.email,
      input.displayName,
      input.status,
      userId,
    ]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapUser(result.rows[0]);
}

export async function deleteUser(
  userId: string
): Promise<boolean> {
  const result = await pool.query(
    `
      DELETE FROM users
      WHERE id = $1
    `,
    [userId]
  );

  return result.rowCount === 1;
}