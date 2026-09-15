import type { Request, Response } from "express";

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../services/productRepository";

import { ApiError } from "../types/apiError";

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

function getProductId(request: Request): string {
  const { id } = request.params;

  if (typeof id !== "string" || id.trim() === "") {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Product ID is required."
    );
  }

  return id;
}

function validateProductInput(body: unknown) {
  if (!body || typeof body !== "object") {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Request body is required."
    );
  }

  const input = body as Record<string, unknown>;

  if (typeof input.id !== "string" || input.id.trim() === "") {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Product ID is required."
    );
  }

  if (!/^[a-z0-9-]+$/.test(input.id)) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Product ID must contain only lowercase letters, numbers, and hyphens."
    );
  }

  if (typeof input.name !== "string" || input.name.trim() === "") {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Product name is required."
    );
  }

  if (!isValidStatus(input.status)) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Product status must be Active, Planning, or Coming Soon."
    );
  }

  if (
    typeof input.description !== "string" ||
    input.description.trim() === ""
  ) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Product description is required."
    );
  }

  if (
    typeof input.category !== "string" ||
    input.category.trim() === ""
  ) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Product category is required."
    );
  }
}

function validateProductUpdate(body: unknown) {
  if (!body || typeof body !== "object") {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Request body is required."
    );
  }

  const input = body as Record<string, unknown>;

  if (typeof input.name !== "string" || input.name.trim() === "") {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Product name is required."
    );
  }

  if (!isValidStatus(input.status)) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Product status must be Active, Planning, or Coming Soon."
    );
  }

  if (
    typeof input.description !== "string" ||
    input.description.trim() === ""
  ) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Product description is required."
    );
  }

  if (
    typeof input.category !== "string" ||
    input.category.trim() === ""
  ) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Product category is required."
    );
  }
}

export async function listProducts(
  _request: Request,
  response: Response
) {
  const products = await getProducts();

  response.status(200).json({
    data: products,
  });
}

export async function getProduct(
  request: Request,
  response: Response
) {
  const productId = getProductId(request);

  const product = await getProductById(productId);

  if (!product) {
    throw new ApiError(
      404,
      "NOT_FOUND",
      "Product not found."
    );
  }

  response.status(200).json({
    data: product,
  });
}

export async function createProductHandler(
  request: Request,
  response: Response
) {
  validateProductInput(request.body);

  const existingProduct = await getProductById(
    request.body.id
  );

  if (existingProduct) {
    throw new ApiError(
      409,
      "DUPLICATE",
      "A product with this ID already exists."
    );
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
}

export async function updateProductHandler(
  request: Request,
  response: Response
) {
  const productId = getProductId(request);

  validateProductUpdate(request.body);

  const product = await updateProduct(productId, {
    name: request.body.name.trim(),
    status: request.body.status,
    description: request.body.description.trim(),
    category: request.body.category.trim(),
  });

  if (!product) {
    throw new ApiError(
      404,
      "NOT_FOUND",
      "Product not found."
    );
  }

  response.status(200).json({
    data: product,
  });
}

export async function deleteProductHandler(
  request: Request,
  response: Response
) {
  const productId = getProductId(request);

  const deleted = await deleteProduct(productId);

  if (!deleted) {
    throw new ApiError(
      404,
      "NOT_FOUND",
      "Product not found."
    );
  }

  response.status(204).send();
}