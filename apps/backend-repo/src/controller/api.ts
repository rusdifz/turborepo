// controller/api.ts
import { Request, Response, NextFunction } from "express";
import {
  classToPlain,
  instanceToPlain,
  plainToClass,
  plainToInstance,
} from "class-transformer";
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
import {
  CreateUserDTO,
  ReqGetUserListDTO,
  UpdateUserDTO,
} from "../dto/user.dto";
import { calculatePotentialScore } from "../helpers/potentialScore";

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
    const reqQuery = plainToInstance(ReqGetUserListDTO, req.query);

    const users = await getUsers(reqQuery);
    // console.log("users", users);

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
    validate(user).then((errors) => {
      // errors is an array of validation errors
      if (errors.length > 0) {
        const errorMessages = errors
          .map((error) => Object.values(error.constraints || {}))
          .flat();
        res
          .status(400)
          .json({ message: "Validation failed", errors: errorMessages });
      }
    });

    const userPlain = instanceToPlain(user);
    console.log("before");

    const getDetail = await getUserById(userId);
    console.log("after");

    userPlain["potentialScore"] = calculatePotentialScore(
      getDetail.totalAverageWeightRatings,
      getDetail.numberOfRents,
      getDetail.recentlyActive
    );
    userPlain["update_at"] = new Date();
    // userPlain["recentlyActive"] = Date.now();

    const resUpdate = await updateUser(userId, userPlain);

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
    const user = plainToInstance(CreateUserDTO, req.body);

    // Validasi DTO
    validate(user).then((errors) => {
      // errors is an array of validation errors
      if (errors.length > 0) {
        const errorMessages = errors
          .map((error) => Object.values(error.constraints || {}))
          .flat();
        res
          .status(400)
          .json({ message: "Validation failed", errors: errorMessages });
      }
    });

    const resCreate = await createUser(instanceToPlain(user));

    res.status(200).json({ message: "Success Update", data: resCreate });
  } catch (error) {
    next(error);
  }
}
