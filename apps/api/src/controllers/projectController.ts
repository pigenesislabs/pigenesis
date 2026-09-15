import type { Request, Response } from "express";

import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from "../services/projectRepository";

import { ApiError } from "../types/apiError";

const validStatuses = [
  "Active",
  "Planning",
  "Completed",
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

function getProjectId(request: Request): string {
  const { id } = request.params;

  if (typeof id !== "string" || id.trim() === "") {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Project ID is required."
    );
  }

  return id;
}

function validateProjectInput(body: unknown) {
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
      "Project ID is required."
    );
  }

  if (!/^[a-z0-9-]+$/.test(input.id)) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Project ID must contain only lowercase letters, numbers, and hyphens."
    );
  }

  if (typeof input.name !== "string" || input.name.trim() === "") {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Project name is required."
    );
  }

  if (!isValidStatus(input.status)) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Project status must be Active, Planning, or Completed."
    );
  }

  if (
    typeof input.description !== "string" ||
    input.description.trim() === ""
  ) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Project description is required."
    );
  }

  if (
    typeof input.type !== "string" ||
    input.type.trim() === ""
  ) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Project type is required."
    );
  }
}

function validateProjectUpdate(body: unknown) {
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
      "Project name is required."
    );
  }

  if (!isValidStatus(input.status)) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Project status must be Active, Planning, or Completed."
    );
  }

  if (
    typeof input.description !== "string" ||
    input.description.trim() === ""
  ) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Project description is required."
    );
  }

  if (
    typeof input.type !== "string" ||
    input.type.trim() === ""
  ) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Project type is required."
    );
  }
}

export async function listProjects(
  _request: Request,
  response: Response
) {
  const projects = await getProjects();

  response.status(200).json({
    data: projects,
  });
}

export async function getProject(
  request: Request,
  response: Response
) {
  const projectId = getProjectId(request);

  const project = await getProjectById(projectId);

  if (!project) {
    throw new ApiError(
      404,
      "NOT_FOUND",
      "Project not found."
    );
  }

  response.status(200).json({
    data: project,
  });
}

export async function createProjectHandler(
  request: Request,
  response: Response
) {
  validateProjectInput(request.body);

  const existingProject = await getProjectById(
    request.body.id
  );

  if (existingProject) {
    throw new ApiError(
      409,
      "DUPLICATE",
      "A project with this ID already exists."
    );
  }

  const project = await createProject({
    id: request.body.id.trim(),
    name: request.body.name.trim(),
    status: request.body.status,
    description: request.body.description.trim(),
    type: request.body.type.trim(),
  });

  response.status(201).json({
    data: project,
  });
}

export async function updateProjectHandler(
  request: Request,
  response: Response
) {
  const projectId = getProjectId(request);

  validateProjectUpdate(request.body);

  const project = await updateProject(projectId, {
    name: request.body.name.trim(),
    status: request.body.status,
    description: request.body.description.trim(),
    type: request.body.type.trim(),
  });

  if (!project) {
    throw new ApiError(
      404,
      "NOT_FOUND",
      "Project not found."
    );
  }

  response.status(200).json({
    data: project,
  });
}

export async function deleteProjectHandler(
  request: Request,
  response: Response
) {
  const projectId = getProjectId(request);

  const deleted = await deleteProject(projectId);

  if (!deleted) {
    throw new ApiError(
      404,
      "NOT_FOUND",
      "Project not found."
    );
  }

  response.status(204).send();
}