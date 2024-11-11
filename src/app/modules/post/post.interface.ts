import mongoose from 'mongoose';

export interface TPost {
  _id: string;
  title: string;
  category: 'tips' | 'story';
  isPremium: boolean;
  content: string;
  image: string;
  upVotes: number;
  downVotes: number;
  comments: Comment[];
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  voters: {
    userId: mongoose.Types.ObjectId;
    voteType: 'up' | 'down';
  }[];
  author: string;
  authorId: mongoose.Types.ObjectId;
  authorProfileImage: string;
  authorEmail: string;
}

export interface Comment {
  _id?: string;
  userId: mongoose.Types.ObjectId;
  content: string;
  createdAt?: Date;
}
