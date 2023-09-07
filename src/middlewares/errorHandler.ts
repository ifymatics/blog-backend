import { NextFunction, Request, Response } from "express";
export const errorHandler = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json("Route not found");
};
