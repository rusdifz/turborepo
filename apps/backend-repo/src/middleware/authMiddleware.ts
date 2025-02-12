import { Request, Response, NextFunction } from "express";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized", error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    if (
      token !=
      "099098de4100a22c5f23cc002cc170616e1d439ecaa618fe4e1345522b0063bc"
    )
      res.status(401).json({ message: "Unauthorized", error: "Unauthorized" });

    next();
  } catch (error) {
    // throw new Error(error);
    res.status(401).json();
  }
}
