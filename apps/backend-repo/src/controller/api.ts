// controller/api.ts
import { Request, Response, NextFunction } from "express";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import * as bcrypt from "bcrypt";

import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
} from "../repository/userCollection";
import { setPagination } from "../helpers/pagination.helper";
import { IPagination } from "../interfaces/pagination.interface";
import { User } from "../entities/user";
import { CreateUserDTO, UpdateUserDTO } from "../dto/user.dto";

export async function getUserDetailController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.params["user_id"];

    if (!userId || userId == undefined || userId == null) {
      res
        .status(400)
        .json({ message: "Bad Request", error: "User id is required" });
    }

    const user = await getUserById(userId);

    if (!user) {
      res.status(404).json({ message: "Data not found", data: null });
    }

    res.status(200).json({ message: "Success", data: user });
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
    console.log("this");

    const userId = req.params["user_id"];

    if (!userId || userId == undefined || userId == null) {
      res
        .status(400)
        .json({ message: "Bad Request", error: "User id is required" });
    }

    const user: Partial<User> = plainToInstance(UpdateUserDTO, req.body);

    // Validasi DTO
    const errors = await validate(UpdateUserDTO);

    if (errors.length > 0) {
      // Map error ke pesan yang lebih sederhana
      const errorMessages = errors
        .map((error) => Object.values(error.constraints || {}))
        .flat();
      res
        .status(400)
        .json({ message: "Validation failed", errors: errorMessages });
    }

    const resUpdate = await updateUser(userId, user);

    res.status(200).json({ message: "Success Update", data: resUpdate });
  } catch (error) {
    next(error);
  }
}

export async function createUserController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    console.log("this");

    const plainUserClass = plainToInstance(CreateUserDTO, req.body);

    // Validasi DTO
    const user = await validateInsert(plainUserClass);

    if (user.err.length > 0) {
      res.status(400).json({ message: "Validation failed", errors: user.err });
    }

    const resCreate = await createUser(instanceToPlain(user.data));

    res.status(200).json({ message: "Success Update", data: resCreate });
  } catch (error) {
    next(error);
  }
}

async function validateInsert(
  data: CreateUserDTO
): Promise<{ data: Partial<User>; err: any }> {
  let error: any = [];

  if (!data.email) {
    error.push("Email must be insert");
  }

  if (!data.password) {
    error.push("Password must be insert");
  } else {
    data.password = await bcrypt.hash(data.password, 10);
  }

  data.created_at = new Date();

  return {
    data,
    err: error,
  };
}
