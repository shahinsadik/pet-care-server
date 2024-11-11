import { Request } from 'express';
import { Post } from './post.model';

//* create post into db
const createPostIntoDB = async (req: Request) => {
  const user = req.user;
  const path = req.file ? req.file.path : null;
  const { title, category, isPremium, content } = req.body;
  const postData = {
    author: user.name,
    authorId: user._id,
    authorProfileImage: user.profileImage,
    authorEmail: user.email,
    title,
    category,
    isPremium,
    content,
    image: path,
  };
  const post = await Post.create(postData);
  return post;
};

//* Get all posts
const getAllPostsFromDB = async () => {
  const result = await Post.find();
  return result;
};

//* Up vote post
const upvotePostIntoDB = async (req: Request) => {
  const { postId } = req.body;
  const userId = req.user._id;

  // Finding the post by postId
  const post = await Post.findById(postId);
  if (!post) throw new Error('Post not found'); // If post doesn't exist, throw an error

  // Check if the user has already voted
  const existingVote = post.voters.find(
    (voter) => voter.userId.toString() === userId.toString(),
  );
  // If the user has already upvote, return the post without doing anything
  if (existingVote) {
    if (existingVote.voteType === 'up') return post;

    // If the user has downvote, convert the downvote to an upvote
    post.downVotes -= 1;
    existingVote.voteType = 'up'; // Change the vote type to 'up'
  } else {
    // If the user hasn't voted, add a new upvote
    post.voters.push({ userId, voteType: 'up' }); // Add new voter with an upvote
  }

  // Increment the upvote count (for both cases: new upvote or changing downvote to upvote)
  post.upVotes += 1;

  // Save the updated post to the database
  await post.save();

  // Return the updated post
  return post;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  upvotePostIntoDB,
};
