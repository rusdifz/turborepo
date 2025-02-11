// import { NextFunction, Request, Response } from "express";
// import { db } from "../config/firebaseConfig";
// import { User } from "../entities/user";
// import { FirestoreUser } from "../repository/userCollection";

// export const updateUserData = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id, name, email } = req.body as User;
//     const userRef = db.collection("users").doc(id);
//     await userRef.set({ name, email, updatedAt: new Date() }, { merge: true });
//     res.status(200).json({ message: "User updated successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update user" });
//   }
// };

// export const fetchUserData = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id } = req.query;
//     const userRef = db.collection("users").doc(id as string);
//     const doc = await userRef.get();
//     if (!doc.exists) {
//       res.status(404).json({ error: "User not found" });
//     }
//     res.status(200).json(doc.data());
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch user" });
//   }
// };

// // export async function fetchUserData(req: any, res: any) {
// //   try {
// //   } catch (error) {}
// // }

// // // controller/api.ts
// // import { Request, Response, NextFunction } from 'express';
// // import { updateUserData, fetchUserData } from '../repository/userCollection';

// // export const fetchUserDataController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
// //   try {
// //     const { id } = req.params;
// //     const user = await fetchUserData(id);
// //     if (user) {
// //       res.status(200).json(user);
// //     } else {
// //       res.status(404).json({ error: 'User not found' });
// //     }
// //     // Tidak perlu mengembalikan nilai
// //   } catch (error) {
// //     // Bisa menggunakan next(error) untuk penanganan error secara global
// //     next(error);
// //   }
// // };

// // export const updateUserDataController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
// //   try {
// //     const { id, ...userData } = req.body;
// //     if (!id) {
// //       res.status(400).json({ error: 'User id is required' });
// //       return;
// //     }
// //     await updateUserData(id, userData);
// //     res.status(200).json({ message: 'User data updated successfully' });
// //   } catch (error) {
// //     next(error);
// //   }
// // };
