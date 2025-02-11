// import express from "express";
// import cors from "cors";
// import userRoutes from "../routes/userRoutes";
// import { authMiddleware } from "../middleware/authMiddleware";
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use(authMiddleware);
// app.use("/api", userRoutes);

// // Error handling
// app.use(
//   (
//     err: Error,
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
//   ) => {
//     console.error(err.stack);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// );

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// // // core/app.ts
// // import express from 'express';
// // import userRoutes from '../routes/userRoutes';

// // const app = express();

// // // Middleware global untuk parsing JSON
// // app.use(express.json());

// // // Gunakan routing dengan prefix misalnya '/user'
// // app.use('/user', userRoutes);

// // export default app;

import { IUser } from "@repo/interfaces/user.interface";
