import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import config from "../../infrastructure/config/index.js";

export type AuthenticationToken = typeof authenticationToken;

export function authenticationToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const accessToken = req.cookies["jwt-credential"];
    if (!accessToken) {
      return res.status(401).json({ message: "Missing authorization token" });
    }
    const decodedUser = jwt.verify(accessToken, config.JWT_SECRET as string);
    // @ts-ignore
    req.user = decodedUser;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized: invalid or expired token",
    });
  }
}
