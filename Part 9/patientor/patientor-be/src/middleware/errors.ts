import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    res.status(400).send({ error });
  } else {
    next(error);
  }
};

export default errorMiddleware;
