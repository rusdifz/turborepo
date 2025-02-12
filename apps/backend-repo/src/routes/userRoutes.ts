import { Router } from "express";
import {
  getUserDetailController,
  getUsersController,
  updateUserController,
} from "../controller/api";
const router = Router();

router.put("/update-user-data/:id", updateUserController);
router.get("/fetch-user-data", getUsersController);
router.get("/fetch-user-data/:id", getUserDetailController);

export default router;
