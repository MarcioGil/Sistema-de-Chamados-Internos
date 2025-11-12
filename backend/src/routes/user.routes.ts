import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticateToken, requireAdmin, createResourceLimiter } from '../middlewares';

const router = Router();
const userController = new UserController();

// Todas as rotas requerem autenticação
router.use(authenticateToken);

// Listar usuários (Admin/Atendente)
router.get('/', userController.list.bind(userController));

// Buscar usuário por ID
router.get('/:id', userController.findById.bind(userController));

// Criar usuário (Admin apenas)
router.post('/', requireAdmin, createResourceLimiter, userController.create.bind(userController));

// Atualizar usuário (Admin apenas)
router.patch('/:id', requireAdmin, userController.update.bind(userController));

// Deletar usuário (Admin apenas)
router.delete('/:id', requireAdmin, userController.delete.bind(userController));

export default router;
