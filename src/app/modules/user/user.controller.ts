import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import config from '../../config';
import { Request, Response } from 'express';

//* Create user into db
const createUser = catchAsync(async (req, res) => {
  const path = req.file ? req.file.path : null;
  const user = req.body;
  const result = await UserServices.createUserIntoDB(user, path as string);

// token 
  const { refreshToken, accessToken } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'development',
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: { accessToken, refreshToken },
  });
});

//* get profile from db
const getProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getProfileFromDB(req);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

//* Update profile into db
const updateUserProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.updateProfileIntoDB(req);
  const { refreshToken, accessToken } = result;

  // setting refresh token into cookie
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile updated successfully',
    data: { accessToken, refreshToken },
  });
});

//* Get all user from DB
const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUsers,
  updateUserProfile,
  getProfile,
};
