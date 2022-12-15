import express from 'express';
import morgan from 'morgan';
import { NextFunction, Request, Response } from 'express';
import { errorMiddleware } from './src/errorHandle/middleware';


// ROUTER
import carsRouter from './src/api/routers/carsRouter';
import usersRouter from './src/api/routers/usersRouter';
import { Logger } from './src/errorHandle/ultis';
import errorController from './src/api/controllers/errorController';

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(errorMiddleware)
console.log(process.env.DEV);


// MIDDLEWARE ROUTER
app.use('/api/v1', carsRouter);
app.use('/api/v1', usersRouter);

// ROUTER MIDDLEWARE
app.all('*', (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Logger.info(`Can't find ${req.originalUrl} on this sever!`);
    next();
});

export default app;