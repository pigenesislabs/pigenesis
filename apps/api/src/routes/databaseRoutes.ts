import { Router } from "express";
import { getDatabaseHealth } from "../controllers/databaseController";

const router = Router();

router.get("/health", getDatabaseHealth);

export default router;