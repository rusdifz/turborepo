import { Request, Response, NextFunction } from "express";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized" });
    }

    // const token = authHeader.split(" ")[1];

    // if (token != "rusdifz")
    //   return res.status(401).json({ message: "Unauthorized" });

    next();
  } catch (error) {
    // throw new Error(error);
    res.status(401).json();
  }
}
