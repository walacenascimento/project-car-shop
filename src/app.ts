import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/errorMiddleware';
// import carRouter from './routers/index';
 
const app = express();
app.use(express.json());
// app.use(carRouter);
app.use(errorHandler);

export default app;
