import type { Request, Response } from "express";

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../services/productRepository";

const validStatuses = [
  "Active",
  "Planning",
  "Coming Soon",
] as const;

function isValidStatus(
  value: unknown
): value is (typeof validStatuses)[number] {
  return (
    typeof value === "string" &&
    validStatuses.includes(
      value as (typeof validStatuses)[number]
    )
  );
}

function getProductId(request: Request): string | null {
  const { id } = request.params;

  if (typeof id !== "string") {
    return null;
  }

  return id;
}

function validateProductInput(body: unknown) {
  if (!body || typeof body !== "object") {
    return "Request body is required.";
  }

  const input = body as Record<string, unknown>;

  if (typeof input.id !== "string" || input.id.trim() === "") {
    return "Product ID is required.";
  }

  if (!/^[a-z0-9-]+$/.test(input.id)) {
    return "Product ID must contain only lowercase letters, numbers, and hyphens.";
  }

  if (typeof input.name !== "string" || input.name.trim() === "") {
    return "Product name is required.";
  }

  if (!isValidStatus(input.status)) {
    return "Product status must be Active, Planning, or Coming Soon.";
  }

  if (
    typeof input.description !== "string" ||
    input.description.trim() === ""
  ) {
    return "Product description is required.";
  }

  if (
    typeof input.category !== "string" ||
    input.category.trim() === ""
  ) {
    return "Product category is required.";
  }

  return null;
}

function validateProductUpdate(body: unknown) {
  if (!body || typeof body !== "object") {
    return "Request body is required.";
  }

  const input = body as Record<string, unknown>;

  if (typeof input.name !== "string" || input.name.trim() === "") {
    return "Product name is required.";
  }

  if (!isValidStatus(input.status)) {
    return "Product status must be Active, Planning, or Coming Soon.";
  }

  if (
    typeof input.description !== "string" ||
    input.description.trim() === ""
  ) {
    return "Product description is required.";
  }

  if (
    typeof input.category !== "string" ||
    input.category.trim() === ""
  ) {
    return "Product category is required.";
  }

  return null;
}

export async function listProducts(
  _request: Request,
  response: Response
) {
  try {
    const products = await getProducts();

    response.status(200).json({
      data: products,
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);

    response.status(500).json({
      error: "Failed to fetch products.",
    });
  }
}

export async function getProduct(
  request: Request,
  response: Response
) {
  const productId = getProductId(request);

  if (!productId) {
    response.status(400).json({
      error: "Product ID is required.",
    });

    return;
  }

  try {
    const product = await getProductById(productId);

    if (!product) {
      response.status(404).json({
        error: "Product not found.",
      });

      return;
    }

    response.status(200).json({
      data: product,
    });
  } catch (error) {
    console.error("Failed to fetch product:", error);

    response.status(500).json({
      error: "Failed to fetch product.",
    });
  }
}

export async function createProductHandler(
  request: Request,
  response: Response
) {
  const validationError = validateProductInput(request.body);

  if (validationError) {
    response.status(400).json({
      error: validationError,
    });

    return;
  }

  try {
    const existingProduct = await getProductById(
      request.body.id
    );

    if (existingProduct) {
      response.status(409).json({
        error: "A product with this ID already exists.",
      });

      return;
    }

    const product = await createProduct({
      id: request.body.id.trim(),
      name: request.body.name.trim(),
      status: request.body.status,
      description: request.body.description.trim(),
      category: request.body.category.trim(),
    });

    response.status(201).json({
      data: product,
    });
  } catch (error) {
    console.error("Failed to create product:", error);

    response.status(500).json({
      error: "Failed to create product.",
    });
  }
}

export async function updateProductHandler(
  request: Request,
  response: Response
) {
  const productId = getProductId(request);

  if (!productId) {
    response.status(400).json({
      error: "Product ID is required.",
    });

    return;
  }

  const validationError = validateProductUpdate(request.body);

  if (validationError) {
    response.status(400).json({
      error: validationError,
    });

    return;
  }

  try {
    const product = await updateProduct(productId, {
      name: request.body.name.trim(),
      status: request.body.status,
      description: request.body.description.trim(),
      category: request.body.category.trim(),
    });

    if (!product) {
      response.status(404).json({
        error: "Product not found.",
      });

      return;
    }

    response.status(200).json({
      data: product,
    });
  } catch (error) {
    console.error("Failed to update product:", error);

    response.status(500).json({
      error: "Failed to update product.",
    });
  }
}

export async function deleteProductHandler(
  request: Request,
  response: Response
) {
  const productId = getProductId(request);

  if (!productId) {
    response.status(400).json({
      error: "Product ID is required.",
    });

    return;
  }

  try {
    const deleted = await deleteProduct(productId);

    if (!deleted) {
      response.status(404).json({
        error: "Product not found.",
      });

      return;
    }

    response.status(204).send();
  } catch (error) {
    console.error("Failed to delete product:", error);

    response.status(500).json({
      error: "Failed to delete product.",
    });
  }
}