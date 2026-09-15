import type { Request, Response } from "express";

import {
  createService,
  deleteService,
  getServiceById,
  getServices,
  updateService,
} from "../services/serviceRepository";

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

function getServiceId(request: Request): string {
  const { id } = request.params;

  if (typeof id !== "string" || id.trim() === "") {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Service ID is required."
    );
  }

  return id;
}

function validateServiceInput(body: unknown) {
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
      "Service ID is required."
    );
  }

  if (!/^[a-z0-9-]+$/.test(input.id)) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Service ID must contain only lowercase letters, numbers, and hyphens."
    );
  }

  if (typeof input.name !== "string" || input.name.trim() === "") {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Service name is required."
    );
  }

  if (!isValidStatus(input.status)) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Service status must be Active, Planning, or Coming Soon."
    );
  }

  if (
    typeof input.description !== "string" ||
    input.description.trim() === ""
  ) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Service description is required."
    );
  }

  if (
    typeof input.category !== "string" ||
    input.category.trim() === ""
  ) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Service category is required."
    );
  }
}

function validateServiceUpdate(body: unknown) {
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
      "Service name is required."
    );
  }

  if (!isValidStatus(input.status)) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Service status must be Active, Planning, or Coming Soon."
    );
  }

  if (
    typeof input.description !== "string" ||
    input.description.trim() === ""
  ) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Service description is required."
    );
  }

  if (
    typeof input.category !== "string" ||
    input.category.trim() === ""
  ) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Service category is required."
    );
  }
}

export async function listServices(
  _request: Request,
  response: Response
) {
  const services = await getServices();

  response.status(200).json({
    data: services,
  });
}

export async function getService(
  request: Request,
  response: Response
) {
  const serviceId = getServiceId(request);

  const service = await getServiceById(serviceId);

  if (!service) {
    throw new ApiError(
      404,
      "NOT_FOUND",
      "Service not found."
    );
  }

  response.status(200).json({
    data: service,
  });
}

export async function createServiceHandler(
  request: Request,
  response: Response
) {
  validateServiceInput(request.body);

  const existingService = await getServiceById(
    request.body.id
  );

  if (existingService) {
    throw new ApiError(
      409,
      "DUPLICATE",
      "A service with this ID already exists."
    );
  }

  const service = await createService({
    id: request.body.id.trim(),
    name: request.body.name.trim(),
    status: request.body.status,
    description: request.body.description.trim(),
    category: request.body.category.trim(),
  });

  response.status(201).json({
    data: service,
  });
}

export async function updateServiceHandler(
  request: Request,
  response: Response
) {
  const serviceId = getServiceId(request);

  validateServiceUpdate(request.body);

  const service = await updateService(serviceId, {
    name: request.body.name.trim(),
    status: request.body.status,
    description: request.body.description.trim(),
    category: request.body.category.trim(),
  });

  if (!service) {
    throw new ApiError(
      404,
      "NOT_FOUND",
      "Service not found."
    );
  }

  response.status(200).json({
    data: service,
  });
}

export async function deleteServiceHandler(
  request: Request,
  response: Response
) {
  const serviceId = getServiceId(request);

  const deleted = await deleteService(serviceId);

  if (!deleted) {
    throw new ApiError(
      404,
      "NOT_FOUND",
      "Service not found."
    );
  }

  response.status(204).send();
}