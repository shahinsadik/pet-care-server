import { ZodError, ZodIssue } from 'zod';

type TerrorSource = { path: string | number; message: string }[];

const handleZodError = (err: ZodError) => {
  const errorSource: TerrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: ' Zod Error Occurred!',
    errorSource,
    stack: err?.stack,
  };
};

export default handleZodError;
