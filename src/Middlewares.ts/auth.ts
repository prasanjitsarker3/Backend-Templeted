/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { TUserRole, User } from "../Module/User/userModel";
import catchAsync from "../UtlitisFunc/catchAsync";
import AppError from "../Error/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(404, "You are not authorized!");
    }

    let decoded;
    try {
      decoded = jwt.verify(token, config.accessToken as string) as JwtPayload;
    } catch (err) {
      throw new AppError(404, "Unauthorized");
    }

    const { role, email, name, iat } = decoded;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new AppError(404, "This user is not found !");
    }

    const isDeleted = user?.isDeleted;
    if (isDeleted) {
      throw new AppError(401, "This user is deleted !");
    }

    const userStatus = user?.status;
    if (userStatus === "block") {
      throw new AppError(401, "This user is blocked !");
    }

    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number
      )
    ) {
      throw new AppError(404, "You are not authorized !");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(404, "You are not authorized");
    }

    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};

export default auth;
