import type { Request, Response } from "express";

import {
  createUser,
  editUser,
  getUserById,
  getUsers,
  removeUser,
} from "../services/userService";

import { ApiError } from "../types/apiError";

const validStatuses = [
  "Active",
  "Invited",
  "Suspended",
  "Disabled",
] as const;

function isValidStatus(
  value: unknown
): value is (typeof validStatuses)[number] {
  return (
    typeof value === "string" &&
    validStatuses.includes(value as (typeof validStatuses)[number])
  );
}

function getUserId(request: Request): string {
  const { id } = request.params;

  if (typeof id !== "string" || id.trim() === "") {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "User ID is required."
    );
  }

  return id.trim();
}

function validateEmail(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  );
}

function validateUserInput(body: unknown) {
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
      "User ID is required."
    );
  }

  if (!/^[a-z0-9-]+$/.test(input.id.trim())) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "User ID must contain only lowercase letters, numbers, and hyphens."
    );
  }

  if (!validateEmail(input.email)) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "A valid user email is required."
    );
  }

  if (
    typeof input.displayName !== "string" ||
    input.displayName.trim() === ""
  ) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "User display name is required."
    );
  }

  if (!isValidStatus(input.status)) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "User status must be Active, Invited, Suspended, or Disabled."
    );
  }
}

function validateUserUpdate(body: unknown) {
  if (!body || typeof body !== "object") {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "Request body is required."
    );
  }

  const input = body as Record<string, unknown>;

  if (!validateEmail(input.email)) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "A valid user email is required."
    );
  }

  if (
    typeof input.displayName !== "string" ||
    input.displayName.trim() === ""
  ) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "User display name is required."
    );
  }

  if (!isValidStatus(input.status)) {
    throw new ApiError(
      400,
      "VALIDATION_ERROR",
      "User status must be Active, Invited, Suspended, or Disabled."
    );
  }
}

export async function listUsers(
  _request: Request,
  response: Response
): Promise<void> {
  const users = await getUsers();

  response.status(200).json({
    data: users,
  });
}

export async function getUser(
  request: Request,
  response: Response
): Promise<void> {
  const userId = getUserId(request);

  const user = await getUserById(userId);

  if (!user) {
    throw new ApiError(
      404,
      "NOT_FOUND",
      "User not found."
    );
  }

  response.status(200).json({
    data: user,
  });
}

export async function createNewUser(
  request: Request,
  response: Response
): Promise<void> {
  validateUserInput(request.body);

  const user = await createUser({
    id: request.body.id.trim(),
    email: request.body.email.trim(),
    displayName: request.body.displayName.trim(),
    status: request.body.status,
  });

  response.status(201).json({
    data: user,
  });
}

export async function updateExistingUser(
  request: Request,
  response: Response
): Promise<void> {
  const userId = getUserId(request);

  validateUserUpdate(request.body);

  const user = await editUser(userId, {
    email: request.body.email.trim(),
    displayName: request.body.displayName.trim(),
    status: request.body.status,
  });

  if (!user) {
    throw new ApiError(
      404,
      "NOT_FOUND",
      "User not found."
    );
  }

  response.status(200).json({
    data: user,
  });
}

export async function deleteExistingUser(
  request: Request,
  response: Response
): Promise<void> {
  const userId = getUserId(request);

  const deleted = await removeUser(userId);

  if (!deleted) {
    throw new ApiError(
      404,
      "NOT_FOUND",
      "User not found."
    );
  }

  response.status(204).send();
}