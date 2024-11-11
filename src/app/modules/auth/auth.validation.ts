import { z } from 'zod';

const signInUserValidationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .email({ message: 'Invalid email' })
      .min(1, { message: 'Email is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string().min(1, { message: 'Old password is required' }),
    newPassword: z.string().min(1, { message: 'New password is required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string().min(1, { message: 'Refresh token is required' }),
  }),
});

export const AuthValidations = {
  signInUserValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
};
