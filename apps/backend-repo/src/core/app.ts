import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import userRoutes from "../routes/userRoutes";
import { authenticate } from "../middleware/authMiddleware";
// import { handleError } from "@/helpers/error.helper";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
app.use(authenticate);

// Routes
app.use("/api", userRoutes);

// app.use(
//   (
//     err: Error,
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
//   ) => {
//     handleError(err, res);
//   }
// );
// Error handling
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
