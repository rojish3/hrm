import { NextFunction, Response, Request } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { env } from "../config/env";
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (!token)
    return res.status(401).json({ message: "You are not authenticated" });
  jwt.verify(
    token,
    env.JWT_SECRET as string,
    (err: VerifyErrors | null, user: any) => {
      if (err) return res.status(403).json("Invalid token");
      res.locals.user = user;
      //   console.log(user);
      next();
    }
  );
};
