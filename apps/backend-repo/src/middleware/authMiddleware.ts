// import { Request, Response, NextFunction } from "express";
// import { auth } from "firebase-admin";

// export const authMiddleware = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token: any = req.headers.authorization?.split("Bearer ")[1];
//   if (!token) {
//     res.status(401).json({ error: "Unauthorized" });
//   }

//   try {
//     const decodedToken = await auth().verifyIdToken(token);
//     // req.user = decodedToken;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: "Invalid token" });
//   }
// };

// // export async function authMiddleware(
// //   req: Request,
// //   res: Response,
// //   next: NextFunction
// // ) {
// //   try {
// //   } catch (error) {}
// // }

// // // middleware/authMiddleware.ts
// // import { Request, Response, NextFunction } from 'express';

// // export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
// //   // Ambil token dari header Authorization
// //   const token = req.headers.authorization;

// //   // Validasi sederhana: cek apakah token ada dan cocok dengan nilai tertentu
// //   if (!token || token !== 'Bearer valid-token') {
// //     return res.status(401).json({ error: 'Unauthorized' });
// //   }

// //   next();
// // };
