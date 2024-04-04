import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import { env } from "./config/env";
import userRoutes from "./user/index";
import serviceRoutes from "./serviceEvent/index";
import authRoutes from "./auth/index";
import allowanceRoutes from "./allowance/index";
import jobTypeRoutes from "./jobType/index";
import positionRoutes from "./position/index";
import { errorMiddleware } from "./middlewares/error-handler";
import { appError } from "./utils/appError";

const app: Express = express();
const port = env.PORT;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", userRoutes());
app.use("/api", serviceRoutes());
app.use("/api", authRoutes());
app.use("/api", allowanceRoutes());
app.use("/api", jobTypeRoutes());
app.use("/api", positionRoutes());

// Handling unhandled routes
app.all("*", (req, res, next) => {
  next(new appError(404, `Can't find ${req.originalUrl}  on this server!`));
});

// error handling middleware
app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${env.PORT}`);
});
