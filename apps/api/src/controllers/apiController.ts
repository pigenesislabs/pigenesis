import type { Request, Response } from "express";
import appConfig from "../config/appConfig";

export function getApiInfo(
  _request: Request,
  response: Response
) {
  response.status(200).json({
    name: appConfig.appName,
    version: appConfig.apiVersion,
    environment: appConfig.environment,
  });
}