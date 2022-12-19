import { Router } from 'express';
import AuthControllers from '../controllers/Auth.controllers';
import { validatorLogin, validatorRegistration } from '../middlewares/validations';

const router = Router();
router.post('/register', validatorRegistration, AuthControllers.register);
router.post('/active', AuthControllers.activeAccount);
router.post('/login', validatorLogin, AuthControllers.login);
router.get('/refresh_token', AuthControllers.refreshToken);
router.get('/logout', AuthControllers.logout);

export default router;
