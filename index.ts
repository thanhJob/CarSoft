import express from 'express';
import morgan from 'morgan';

// ROUTER
import rootRouter from './routers/carsRouter';

const app = express();

// MIDDLEWARE
app.use(express.json({ limit: 50 }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


// MIDDLEWARE ROUTER
app.use('/api/v1/cars', rootRouter);


export default app;