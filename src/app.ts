import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import notFoundRoute from './app/middlewares/notFoundRoute';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';

const app: Application = express();

// parser
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['*'], credentials: true }));

// application routes
app.use('/api', router);

// server route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the app');
});

// not found route
app.use(notFoundRoute);

// error handling for whole project
app.use(globalErrorHandler);

export default app;
