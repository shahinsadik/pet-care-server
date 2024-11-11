import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/appError';
import { TUser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';
import { createToken } from '../auth/auth.utils';
import { Request } from 'express';

//* create user into db
const createUserIntoDB = async (payload: TUser, path: string) => {
  // checking if the user exists (using statics method of mongoose)
  const user = await User.isUserExistsByEmail(payload?.email);
  console.log(user);
  
  if (user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This User is already exists!');
  }

  // converting plain password into hash password
  const hashPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );
  payload.password = hashPassword;
  const userInfo = { ...payload, profileImage: path };
  const newUser = await User.create(userInfo);

  // Creating jwt token and sending it to the client
  const jwtPayload = {
    _id: newUser?._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    profileImage: newUser.profileImage,
  };

  // creating access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  // creating refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return { accessToken, refreshToken };
};

//* get profile form db
const getProfileFromDB = async (req: Request) => {
  // getting the user from req, we have set user in req in auth from jwt payload
  const user = req.user;

  // now we will find the user in db using email
  const isUserExists = await User.findOne({ email: user.email });

  // throwing error if we don't find the user
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // removing the password field in response
  const removeFields = isUserExists.toObject();
  const { password, ...remainingData } = removeFields;

  return remainingData;
};

//* update profile into db
const updateProfileIntoDB = async (req: Request) => {
  // Restrict user from updating email & password
  if (req.body.email || req.body.password || req.body._id) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Updating id, email & password is forbidden',
    );
  }

  // getting profile info from request
  const user = req.user;

  // checking if user exists
  const isUserExists = await User.findOne({ email: user.email });

  // throwing error if we don't find the user
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // updating profile info in db using email
  const result = await User.findOneAndUpdate({ email: user.email }, req.body, {
    new: true,
  });

  // throwing error if we could not update user
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Error in updating profile info');
  }

  // Creating jwt token and sending it to the client
  const jwtPayload = {
    _id: result?._id,
    name: result?.name,
    email: result?.email,
    role: result?.role,
    profileImage: result?.profileImage,
  };

  // creating access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  // creating refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return { accessToken, refreshToken };
};

//* Get all user from DB
const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  updateProfileIntoDB,
  getProfileFromDB,
};
