import pool from "../config/database";
import type {
  CreateProductInput,
  Product,
  UpdateProductInput,
} from "../types/product";

type ProductRow = {
  id: string;
  name: string;
  status: Product["status"];
  description: string;
  category: string;
  created_at: Date;
  updated_at: Date;
};

function mapProduct(row: ProductRow): Product {
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

export async function getProducts(): Promise<Product[]> {
  const result = await pool.query<ProductRow>(
    `
      SELECT
        id,
        name,
        status,
        description,
        category,
        created_at,
        updated_at
      FROM products
      ORDER BY created_at DESC
    `
  );

  return result.rows.map(mapProduct);
}

export async function getProductById(
  id: string
): Promise<Product | null> {
  const result = await pool.query<ProductRow>(
    `
      SELECT
        id,
        name,
        status,
        description,
        category,
        created_at,
        updated_at
      FROM products
      WHERE id = $1
    `,
    [id]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapProduct(result.rows[0]);
}

export async function createProduct(
  input: CreateProductInput
): Promise<Product> {
  const result = await pool.query<ProductRow>(
    `
      INSERT INTO products (
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

  return mapProduct(result.rows[0]);
}

export async function updateProduct(
  id: string,
  input: UpdateProductInput
): Promise<Product | null> {
  const result = await pool.query<ProductRow>(
    `
      UPDATE products
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

  return mapProduct(result.rows[0]);
}

export async function deleteProduct(
  id: string
): Promise<boolean> {
  const result = await pool.query(
    `
      DELETE FROM products
      WHERE id = $1
    `,
    [id]
  );

  return result.rowCount === 1;
}