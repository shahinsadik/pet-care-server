import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import config from '../../config';

const signInUser = catchAsync(async (req, res) => {
  const result = await AuthServices.signInUserIntoDB(req.body);
  const { refreshToken, accessToken } = result;

  // setting refresh token into cookie
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Logged In successfully',
    data: { accessToken, refreshToken },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await AuthServices.changePasswordIntoDB(
    req.user,
    passwordData,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password Changed successfully',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  // getting refresh token from cookie
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Access token created successfully using refresh token.',
    data: result,
  });
});

export const AuthControllers = {
  signInUser,
  changePassword,
  refreshToken,
};
