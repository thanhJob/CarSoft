import express from 'express';
import morgan from 'morgan';

// ROUTER
import carsRouter from './src/api/routers/carsRouter';
import usersRouter from './src/api/routers/usersRouter';

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


// MIDDLEWARE ROUTER
app.use('/api/v1/cars', carsRouter);
app.use('/api/v1/users', usersRouter);


export default app;