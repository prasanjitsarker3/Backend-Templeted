/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response } from "express";

type Unauthorized<T> = {
  success: boolean;
  message?: string;
  errorMessage: string;
  errorDetails: string | null;
  stack: string | null;
};

export const handleUnauthorized = (res: Response, data: Unauthorized<null>) => {
  res.status(401).json({
    success: data.success,
    message: data.message,
    errorMessage: data.errorMessage,
    errorDetails: data.errorDetails,
    stack: data.stack,
  });
};
