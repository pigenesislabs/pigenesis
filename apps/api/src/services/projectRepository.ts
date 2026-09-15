import pool from "../config/database";
import type {
  CreateProjectInput,
  Project,
  UpdateProjectInput,
} from "../types/project";

type ProjectRow = {
  id: string;
  name: string;
  status: Project["status"];
  description: string;
  type: string;
  created_at: Date;
  updated_at: Date;
};

function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    name: row.name,
    status: row.status,
    description: row.description,
    type: row.type,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getProjects(): Promise<Project[]> {
  const result = await pool.query<ProjectRow>(
    `
      SELECT
        id,
        name,
        status,
        description,
        type,
        created_at,
        updated_at
      FROM projects
      ORDER BY created_at DESC
    `
  );

  return result.rows.map(mapProject);
}

export async function getProjectById(
  id: string
): Promise<Project | null> {
  const result = await pool.query<ProjectRow>(
    `
      SELECT
        id,
        name,
        status,
        description,
        type,
        created_at,
        updated_at
      FROM projects
      WHERE id = $1
    `,
    [id]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapProject(result.rows[0]);
}

export async function createProject(
  input: CreateProjectInput
): Promise<Project> {
  const result = await pool.query<ProjectRow>(
    `
      INSERT INTO projects (
        id,
        name,
        status,
        description,
        type
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING
        id,
        name,
        status,
        description,
        type,
        created_at,
        updated_at
    `,
    [
      input.id,
      input.name,
      input.status,
      input.description,
      input.type,
    ]
  );

  return mapProject(result.rows[0]);
}

export async function updateProject(
  id: string,
  input: UpdateProjectInput
): Promise<Project | null> {
  const result = await pool.query<ProjectRow>(
    `
      UPDATE projects
      SET
        name = $1,
        status = $2,
        description = $3,
        type = $4,
        updated_at = NOW()
      WHERE id = $5
      RETURNING
        id,
        name,
        status,
        description,
        type,
        created_at,
        updated_at
    `,
    [
      input.name,
      input.status,
      input.description,
      input.type,
      id,
    ]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapProject(result.rows[0]);
}

export async function deleteProject(
  id: string
): Promise<boolean> {
  const result = await pool.query(
    `
      DELETE FROM projects
      WHERE id = $1
    `,
    [id]
  );

  return result.rowCount === 1;
}