import mongoose, { model, Schema } from 'mongoose';
import { Comment, TPost } from './post.interface';

//* comment schema
const commentSchema = new Schema<Comment>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//* voter schema
const voterSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  voteType: {
    type: String,
    enum: ['up', 'down'],
    required: true,
  },
});

//* Post schema
const postSchema = new Schema<TPost>(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Title is required'],
    },
    category: {
      type: String,
      enum: {
        values: ['tips', 'story'],
        message: '{VALUE} is not a valid category',
      },
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      required: [true, 'content is required'],
    },
    image: {
      type: String,
      trim: true,
    },
    upVotes: {
      type: Number,
      default: 0,
    },
    downVotes: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
    voters: [voterSchema],
    isPublished: {
      type: Boolean,
      default: true,
    },
    author: {
      type: String,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    authorProfileImage: {
      type: String,
    },
    authorEmail: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Post = model<TPost>('Post', postSchema);
