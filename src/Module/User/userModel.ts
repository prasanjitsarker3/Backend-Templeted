import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./userInterface";
import bcrypt from "bcrypt";
import config from "../../config";
import { USER_ROLE } from "./userConstant";

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: 0,
    },
    bio: {
      type: String,
      default: null,
    },
    profilePhoto: {
      type: String,
      default: null,
    },
    coverPhoto: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "block"],
      default: "active",
    },
    role: {
      type: String,
      enum: ["superAdmin", "admin", "user"],
      default: "user",
    },

    date: {
      type: Date,
      default: Date.now,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

// // set '' after saving password
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>("User", userSchema);
export type TUserRole = keyof typeof USER_ROLE;
