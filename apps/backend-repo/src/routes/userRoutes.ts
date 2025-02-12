import { Router } from "express";
import {
  getUserDetailController,
  getUsersController,
  updateUserController,
  createUserController,
} from "../controller/api";
const router = Router();

router.post("/create-user-data", createUserController);
router.put("/update-user-data/:user_id", updateUserController);
router.get("/fetch-user-data", getUsersController);
router.get("/fetch-user-data/:user_id", getUserDetailController);

export default router;
