import { Router } from 'express';
import { TicketController } from '../controllers/ticket.controller';
import {
  authenticateToken,
  requireAdmin,
  createResourceLimiter,
} from '../middlewares';

const router = Router();
const ticketController = new TicketController();

// Todas as rotas requerem autenticação
router.use(authenticateToken);

// Rotas de tickets
router.post('/', createResourceLimiter, ticketController.create.bind(ticketController));
router.get('/', ticketController.list.bind(ticketController));
router.get('/:id', ticketController.findById.bind(ticketController));
router.patch('/:id', ticketController.update.bind(ticketController));
router.delete('/:id', requireAdmin, ticketController.delete.bind(ticketController));

// Comentários
router.post('/:id/comments', ticketController.addComment.bind(ticketController));

export default router;
