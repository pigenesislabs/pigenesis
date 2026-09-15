import pool from "../config/database";
import type {
  CreateServiceInput,
  Service,
  UpdateServiceInput,
} from "../types/service";

type ServiceRow = {
  id: string;
  name: string;
  status: Service["status"];
  description: string;
  category: string;
  created_at: Date;
  updated_at: Date;
};

function mapService(row: ServiceRow): Service {
  return {
    id: row.id,
    name: row.name,
    status: row.status,
    description: row.description,
    category: row.category,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getServices(): Promise<Service[]> {
  const result = await pool.query<ServiceRow>(
    `
      SELECT
        id,
        name,
        status,
        description,
        category,
        created_at,
        updated_at
      FROM services
      ORDER BY created_at DESC
    `
  );

  return result.rows.map(mapService);
}

export async function getServiceById(
  id: string
): Promise<Service | null> {
  const result = await pool.query<ServiceRow>(
    `
      SELECT
        id,
        name,
        status,
        description,
        category,
        created_at,
        updated_at
      FROM services
      WHERE id = $1
    `,
    [id]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapService(result.rows[0]);
}

export async function createService(
  input: CreateServiceInput
): Promise<Service> {
  const result = await pool.query<ServiceRow>(
    `
      INSERT INTO services (
        id,
        name,
        status,
        description,
        category
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING
        id,
        name,
        status,
        description,
        category,
        created_at,
        updated_at
    `,
    [
      input.id,
      input.name,
      input.status,
      input.description,
      input.category,
    ]
  );

  return mapService(result.rows[0]);
}

export async function updateService(
  id: string,
  input: UpdateServiceInput
): Promise<Service | null> {
  const result = await pool.query<ServiceRow>(
    `
      UPDATE services
      SET
        name = $1,
        status = $2,
        description = $3,
        category = $4,
        updated_at = NOW()
      WHERE id = $5
      RETURNING
        id,
        name,
        status,
        description,
        category,
        created_at,
        updated_at
    `,
    [
      input.name,
      input.status,
      input.description,
      input.category,
      id,
    ]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapService(result.rows[0]);
}

export async function deleteService(
  id: string
): Promise<boolean> {
  const result = await pool.query(
    `
      DELETE FROM services
      WHERE id = $1
    `,
    [id]
  );

  return result.rowCount === 1;
}