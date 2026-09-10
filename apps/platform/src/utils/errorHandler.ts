import type { AppError } from "../types/appError";

export function createAppError(
  code: AppError["code"],
  message: string,
  details?: string
): AppError {
  return {
    code,
    message,
    details,
  };
}

export function getErrorMessage(
  error: unknown
): string {
  if (typeof error === "string") {
    return error;
  }

  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return "An unexpected error occurred.";
}