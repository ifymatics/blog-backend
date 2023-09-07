import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { verifyJwtToken } from "../utils/jwt-manager";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      currentUserId: string;
    }
  }
}
export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "OPTIONS") {
    next();
  }

  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Unauthorized request!" });
    //throw new NotAuthorizedError
  }
  try {
    const UserToken = req.headers.authorization.split(" ")[1];

    const { aud } = (await verifyJwtToken(UserToken)) as { aud: string };

    req.currentUserId = aud;
    //next();
  } catch (error) {
    //console.log(error?.response);
    return res.status(401).json({ message: "You're not logged in!" });
  }
  next();
};
