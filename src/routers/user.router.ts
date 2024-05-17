import { Router } from "express";
import {
  createUser,
  deleteUser,
  getALLUsers,
  sendEmail,
  updateUser,
} from "../controllers/user.controller";
const router = Router();

router.post("/create", createUser);
router.put("/update/:userId", updateUser);
router.delete("/delete/:userId", deleteUser);
// getallusers;
router.get("/all", getALLUsers);

router.post("/send/email", sendEmail);
export default router;
