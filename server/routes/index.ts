import { Application } from 'express';
import authRouter from './authRouter';

const routes = (app: Application) => {
  app.use('/api/auth', authRouter);
};

export default routes;
