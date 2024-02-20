import express from "express";
import { UserControllers } from "./userController";
import validateRequest from "../../Middlewares.ts/validationRequest";
import { loginValidationSchema, userValidationSchema } from "./userValidation";
import auth from "../../Middlewares.ts/auth";
import { USER_ROLE } from "./userConstant";

const router = express.Router();
router.post(
  "/register",
  validateRequest(userValidationSchema),
  UserControllers.createUserIntoDB
);
router.post(
  "/login",
  validateRequest(loginValidationSchema),
  UserControllers.loginUser
);
router.post(
  "/change-password",
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.changeUserPassword
);

router.get("/", UserControllers.getAllUser);

export const userRoutes = router;
