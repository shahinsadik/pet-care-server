import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: 0,
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not a valid role',
      },
      default: 'user',
    },
    profileImage: {
      type: String,
      trim: true,
      required: [true, 'Profile Image is required'],
    },
    passwordChangedAt: {
      type: Date,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

//* By using User model we can access these functions from the model
// function for finding a user in db with _id (using statics feature of mongoose)
userSchema.statics.isUserExistsById = async function (id) {
  return await User.findById({ _id: id }).select('+password');
};

// function for finding a user in db with email (using statics feature of mongoose)
userSchema.statics.isUserExistsByEmail = async function (email) {
  return await User.findOne({ email: email }).select('+password');
};

// function for checking if the user provided password is correct or not
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

// checking if the jwt issued before password change or not
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp,
  jwtIssuedTimestamp,
) {
  const passwordChangeTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;

  return passwordChangeTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', userSchema);
