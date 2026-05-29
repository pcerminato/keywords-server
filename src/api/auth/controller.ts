import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";

/*
 * Validates credentials agains the single hardcoded/local user for the app (no db for users)
 * and generates a jwt access token.
 */
export function login(req: Request, res: Response, next: NextFunction) {
  try {
    // get the credentials from the request
    const { userName, password } = req.body;
    // validate the credential
    /* TODO: use users DB */
    if (
      userName !== config.LOGIN_USER_NAME ||
      password !== config.LOGIN_PASSWORD
    ) {
      return res.status(401).json({
        message: "Access denied: incorrect credentials.",
      });
    }

    // generate access token
    const accessToken = jwt.sign({ userName }, config.JWT_SECRET as string, {
      expiresIn:
        "24h", /* in a real production app, expiration should be shorter (ex. '1h') */
    });

    res.cookie("jwt-credential", accessToken, {
      httpOnly: true,
      secure: false, // localhost
      expires: new Date(Date.now() + ((60 * 1000) * 60) * 60 * 24), // expires in 24hs
      sameSite: "lax",
    });
    res.status(201).json({ userName /* accessToken */ });
  } catch (error) {
    res.status(500).json({ "message": "Error on login" });
  }
}
