import { Model } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
  bio?: string;
  profilePhoto?: string;
  coverPhoto?: string;
  status: "active" | "block";
  role: "user" | "admin" | "superAdmin";
  date: Date;
  isDeleted: boolean;
  passwordChangedAt?: Date;
};

export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}
