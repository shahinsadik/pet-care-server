import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { multerUpload } from '../../config/multer.config';

const router = express.Router();

// register user
router.post(
  '/register',
  multerUpload.single('profileImage'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    console.log(req.body);
    
    next();
  },
  validateRequest(UserValidations.userValidationSchema),
  UserControllers.createUser,
);

// get profile route
router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getProfile,
);

// get all user
router.get(
  '/all-users',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getAllUsers,
);

// update profile
router.put(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  // validateRequest(UserValidations.userUpdateValidationSchema),
  UserControllers.updateUserProfile,
);

export const UserRoutes = router;
