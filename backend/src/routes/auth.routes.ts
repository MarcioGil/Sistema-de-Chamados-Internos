import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticateToken, loginLimiter } from '../middlewares';

const router = Router();
const authController = new AuthController();

// Rotas públicas (sem autenticação)
router.post('/register', authController.register.bind(authController));
router.post('/login', loginLimiter, authController.login.bind(authController));

// Rotas protegidas
router.get('/me', authenticateToken, authController.me.bind(authController));

export default router;
