import { Application } from 'express';
import authRouter from './authRouter';
import { validatorRegistration } from '../middlewares/validations';

const routes = (app: Application) => {
  app.use('/api/auth', validatorRegistration, authRouter);
};

export default routes;
