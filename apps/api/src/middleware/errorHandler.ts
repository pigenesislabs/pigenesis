import type {
  ErrorRequestHandler,
  Request,
  Response,
} from "express";

import { ApiError } from "../types/apiError";

const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  _next
) => {
  console.error("API Error:", error);

  if (error instanceof ApiError) {
    response.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
      },
    });

    return;
  }

  if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    error.code === "23505"
  ) {
    response.status(409).json({
      error: {
        code: "DUPLICATE",
        message: "A record with this ID already exists.",
      },
    });

    return;
  }

  response.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message: "An unexpected server error occurred.",
    },
  });
};

export default errorHandler;