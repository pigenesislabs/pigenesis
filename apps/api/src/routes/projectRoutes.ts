import { Router } from "express";

import {
  createProjectHandler,
  deleteProjectHandler,
  getProject,
  listProjects,
  updateProjectHandler,
} from "../controllers/projectController";

const router = Router();

router.get("/", listProjects);
router.get("/:id", getProject);
router.post("/", createProjectHandler);
router.put("/:id", updateProjectHandler);
router.delete("/:id", deleteProjectHandler);

export default router;