import catchAsync from "../../UtlitisFunc/catchAsync";
import sendResponse from "../../UtlitisFunc/sendResponse";
import { UserServices } from "./userService";

const createUserIntoDB = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await UserServices.registerUserIntoDB(data);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Registration successfully !",
    data: result,
  });
});
const loginUser = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await UserServices.LoginUserIntoDB(data);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successfully !",
    data: result,
  });
});

const changeUserPassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await UserServices.changeUserPasswordIntoDB(
    req.user,
    passwordData
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Change password successfully !",
    data: result,
  });
});
const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All User Fetch successfully !",
    data: result,
  });
});

export const UserControllers = {
  createUserIntoDB,
  loginUser,
  changeUserPassword,
  getAllUser,
};
