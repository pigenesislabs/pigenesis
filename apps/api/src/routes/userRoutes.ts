import { Router } from "express";

import {
  createNewUser,
  deleteExistingUser,
  getUser,
  listUsers,
  updateExistingUser,
} from "../controllers/userController";

const router = Router();

router.get("/", listUsers);
router.get("/:id", getUser);
router.post("/", createNewUser);
router.put("/:id", updateExistingUser);
router.delete("/:id", deleteExistingUser);

export default router;