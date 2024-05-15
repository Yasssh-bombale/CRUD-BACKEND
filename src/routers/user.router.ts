import { Router } from "express";
import {
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/user.controller";
const router = Router();

router.post("/create", createUser);
router.put("/update/:userId", updateUser);
router.delete("/delete/:userId", deleteUser);
export default router;
