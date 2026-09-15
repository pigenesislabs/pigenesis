import type { Request, Response } from "express";
import pool from "../config/database";

export async function getDatabaseHealth(
  _request: Request,
  response: Response
) {
  try {
    await pool.query("SELECT 1");

    response.status(200).json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    response.status(503).json({
      status: "error",
      database: "disconnected",
    });
  }
}