// controller/api.ts
import { Request, Response, NextFunction, Errback } from "express";
import {
  getUserById,
  getUsers,
  updateUser,
} from "../repository/userCollection";
import { setPagination } from "../helpers/pagination.helper";
import { IPagination } from "../interfaces/pagination.interface";
import { User } from "../entities/user";

export async function getUserDetailController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.params["id"];

    if (!userId || userId == undefined || userId == null) {
      res
        .status(400)
        .json({ message: "Bad Request", error: "User id is required" });
    }

    const user = await getUserById(userId);

    if (!user) {
      res.status(404).json({ message: "Data not found", data: null });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function getUsersController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const reqQuery: any = req.query;

    const page = reqQuery?.page ?? 1;
    const limit = reqQuery?.limit ?? 10;

    const users = await getUsers({ page, limit });

    let mapResp = {
      message: "success but data list empty",
      data: users.data,
    };

    if (users.count > 0) {
      mapResp.message = "success";
      const pagination: IPagination = setPagination(req, users.count);
      Object.assign(mapResp, { pagination });
    }

    res.status(200).json(mapResp);
  } catch (error) {
    next(error);
  }
}

export async function updateUserController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.params["id"];
    const data: Partial<User> = req.body;

    if (!userId || userId == undefined || userId == null) {
      res
        .status(400)
        .json({ message: "Bad Request", error: "User id is required" });
    }

    await updateUser(userId, data);

    res.status(200).json({ id: userId, ...data });
  } catch (error) {
    next(error);
  }
}
