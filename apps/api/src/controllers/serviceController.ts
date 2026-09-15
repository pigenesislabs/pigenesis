import type { Request, Response } from "express";

import {
  createService,
  deleteService,
  getServiceById,
  getServices,
  updateService,
} from "../services/serviceRepository";

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

function getServiceId(request: Request): string | null {
  const { id } = request.params;

  if (typeof id !== "string") {
    return null;
  }

  return id;
}

function validateServiceInput(body: unknown) {
  if (!body || typeof body !== "object") {
    return "Request body is required.";
  }

  const input = body as Record<string, unknown>;

  if (typeof input.id !== "string" || input.id.trim() === "") {
    return "Service ID is required.";
  }

  if (!/^[a-z0-9-]+$/.test(input.id)) {
    return "Service ID must contain only lowercase letters, numbers, and hyphens.";
  }

  if (typeof input.name !== "string" || input.name.trim() === "") {
    return "Service name is required.";
  }

  if (!isValidStatus(input.status)) {
    return "Service status must be Active, Planning, or Coming Soon.";
  }

  if (
    typeof input.description !== "string" ||
    input.description.trim() === ""
  ) {
    return "Service description is required.";
  }

  if (
    typeof input.category !== "string" ||
    input.category.trim() === ""
  ) {
    return "Service category is required.";
  }

  return null;
}

function validateServiceUpdate(body: unknown) {
  if (!body || typeof body !== "object") {
    return "Request body is required.";
  }

  const input = body as Record<string, unknown>;

  if (typeof input.name !== "string" || input.name.trim() === "") {
    return "Service name is required.";
  }

  if (!isValidStatus(input.status)) {
    return "Service status must be Active, Planning, or Coming Soon.";
  }

  if (
    typeof input.description !== "string" ||
    input.description.trim() === ""
  ) {
    return "Service description is required.";
  }

  if (
    typeof input.category !== "string" ||
    input.category.trim() === ""
  ) {
    return "Service category is required.";
  }

  return null;
}

export async function listServices(
  _request: Request,
  response: Response
) {
  try {
    const services = await getServices();

    response.status(200).json({
      data: services,
    });
  } catch (error) {
    console.error("Failed to fetch services:", error);

    response.status(500).json({
      error: "Failed to fetch services.",
    });
  }
}

export async function getService(
  request: Request,
  response: Response
) {
  const serviceId = getServiceId(request);

  if (!serviceId) {
    response.status(400).json({
      error: "Service ID is required.",
    });

    return;
  }

  try {
    const service = await getServiceById(serviceId);

    if (!service) {
      response.status(404).json({
        error: "Service not found.",
      });

      return;
    }

    response.status(200).json({
      data: service,
    });
  } catch (error) {
    console.error("Failed to fetch service:", error);

    response.status(500).json({
      error: "Failed to fetch service.",
    });
  }
}

export async function createServiceHandler(
  request: Request,
  response: Response
) {
  const validationError = validateServiceInput(request.body);

  if (validationError) {
    response.status(400).json({
      error: validationError,
    });

    return;
  }

  try {
    const existingService = await getServiceById(
      request.body.id
    );

    if (existingService) {
      response.status(409).json({
        error: "A service with this ID already exists.",
      });

      return;
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
  } catch (error) {
    console.error("Failed to create service:", error);

    response.status(500).json({
      error: "Failed to create service.",
    });
  }
}

export async function updateServiceHandler(
  request: Request,
  response: Response
) {
  const serviceId = getServiceId(request);

  if (!serviceId) {
    response.status(400).json({
      error: "Service ID is required.",
    });

    return;
  }

  const validationError = validateServiceUpdate(request.body);

  if (validationError) {
    response.status(400).json({
      error: validationError,
    });

    return;
  }

  try {
    const service = await updateService(serviceId, {
      name: request.body.name.trim(),
      status: request.body.status,
      description: request.body.description.trim(),
      category: request.body.category.trim(),
    });

    if (!service) {
      response.status(404).json({
        error: "Service not found.",
      });

      return;
    }

    response.status(200).json({
      data: service,
    });
  } catch (error) {
    console.error("Failed to update service:", error);

    response.status(500).json({
      error: "Failed to update service.",
    });
  }
}

export async function deleteServiceHandler(
  request: Request,
  response: Response
) {
  const serviceId = getServiceId(request);

  if (!serviceId) {
    response.status(400).json({
      error: "Service ID is required.",
    });

    return;
  }

  try {
    const deleted = await deleteService(serviceId);

    if (!deleted) {
      response.status(404).json({
        error: "Service not found.",
      });

      return;
    }

    response.status(204).send();
  } catch (error) {
    console.error("Failed to delete service:", error);

    response.status(500).json({
      error: "Failed to delete service.",
    });
  }
}