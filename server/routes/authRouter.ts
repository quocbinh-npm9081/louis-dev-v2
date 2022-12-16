import { Router } from 'express';
import AuthControllers from '../controllers/Auth.controllers';
import { validatorRegistration } from '../middlewares/validations';

const router = Router();
router.post('/register', validatorRegistration, AuthControllers.register);
router.post('/active/', AuthControllers.activeAccount);

export default router;
