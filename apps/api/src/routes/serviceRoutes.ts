import { Router } from "express";

import {
  createServiceHandler,
  deleteServiceHandler,
  getService,
  listServices,
  updateServiceHandler,
} from "../controllers/serviceController";

const router = Router();

router.get("/", listServices);
router.get("/:id", getService);
router.post("/", createServiceHandler);
router.put("/:id", updateServiceHandler);
router.delete("/:id", deleteServiceHandler);

export default router;