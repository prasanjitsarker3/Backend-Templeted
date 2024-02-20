import { JwtPayload } from "jsonwebtoken";
import AppError from "../../Error/AppError";
import { TUser } from "./userInterface";
import { User } from "./userModel";
import { createToken } from "../../UtlitisFunc/createToken";
import config from "../../config";
import bcrypt from "bcrypt";

const registerUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};
const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};
const LoginUserIntoDB = async (payload: TUser) => {
  const user = await User.findOne({ email: payload.email }).populate(
    "password"
  );
  if (!user) {
    throw new AppError(404, "User is not found !");
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(401, "Password does not match!");
  }

  if (user.status === "block") {
    throw new AppError(401, "User Block !");
  }

  const jwtPayload: JwtPayload = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = createToken(
    jwtPayload,
    config.accessToken as string,
    config.accessTokenExpaierDate as string
  );

  return token;
};

const changeUserPasswordIntoDB = async (
  data: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const user = await User.findOne({ email: data?.email }).populate("password");

  if (!user) {
    throw new AppError(404, "User is not found !");
  }

  if (user.isDeleted) {
    throw new AppError(401, "This user is deleted !");
  }

  if (user.status === "block") {
    throw new AppError(401, "This user is blocked !");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.oldPassword,
    user.password
  );
  if (!isPasswordMatched) {
    throw new AppError(401, "Password does not match !");
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  const result = await User.findOneAndUpdate(
    {
      email: data.email,
      role: data.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    }
  );
  console.log(result);
  return null;
};

export const UserServices = {
  registerUserIntoDB,
  LoginUserIntoDB,
  changeUserPasswordIntoDB,
  getAllUserFromDB,
};
