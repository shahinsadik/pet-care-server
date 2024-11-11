import express, { NextFunction, Request, Response } from 'express';
import { multerUpload } from '../../config/multer.config';
import { PostControllers } from './post.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// create post
router.post(
  '/create-post',
  multerUpload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  auth(USER_ROLE.admin, USER_ROLE.user),
  PostControllers.createPost,
);

// get all posts
router.get('/all-posts', PostControllers.getAllPosts);

// upvote post
router.post(
  '/upvote-post',
  auth(USER_ROLE.admin, USER_ROLE.user),
  PostControllers.upVotePost,
);

export const PostRoutes = router;
