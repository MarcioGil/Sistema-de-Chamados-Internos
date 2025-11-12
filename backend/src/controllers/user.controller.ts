import { Request, Response } from 'express';
import { UserService, createUserSchema, updateUserSchema } from '../services/user.service';

const userService = new UserService();

export class UserController {
  /**
   * Lista todos os usuários (Admin/Atendente)
   */
  async list(req: Request, res: Response) {
    try {
      const { role } = req.user!;

      // Apenas admin e atendente podem listar usuários
      if (role !== 'ADMIN' && role !== 'ATTENDANT') {
        return res.status(403).json({ error: 'Acesso negado' });
      }

      const users = await userService.findAll();
      return res.json({ users });
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      return res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  }

  /**
   * Busca usuário por ID
   */
  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { role } = req.user!;

      // Apenas admin e atendente podem buscar outros usuários
      if (role !== 'ADMIN' && role !== 'ATTENDANT' && req.user!.id !== id) {
        return res.status(403).json({ error: 'Acesso negado' });
      }

      const user = await userService.findById(id);
      return res.json({ user });
    } catch (error: any) {
      console.error('Erro ao buscar usuário:', error);
      if (error.message === 'Usuário não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }

  /**
   * Cria novo usuário (Admin apenas)
   */
  async create(req: Request, res: Response) {
    try {
      const user = await userService.create(req.body);
      return res.status(201).json({ user });
    } catch (error: any) {
      console.error('Erro ao criar usuário:', error);
      if (error.message.includes('já está em uso')) {
        return res.status(400).json({ error: error.message });
      }
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: 'Dados inválidos', details: error.errors });
      }
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }

  /**
   * Atualiza usuário (Admin apenas)
   */
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.update(id, req.body);
      return res.json({ user });
    } catch (error: any) {
      console.error('Erro ao atualizar usuário:', error);
      if (error.message === 'Usuário não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message.includes('já está em uso')) {
        return res.status(400).json({ error: error.message });
      }
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: 'Dados inválidos', details: error.errors });
      }
      return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }

  /**
   * Deleta usuário (Admin apenas)
   */
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { id: currentUserId } = req.user!;

      // Não permitir que admin delete a si mesmo
      if (id === currentUserId) {
        return res.status(400).json({ error: 'Você não pode deletar seu próprio usuário' });
      }

      await userService.delete(id);
      return res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error: any) {
      console.error('Erro ao deletar usuário:', error);
      if (error.message === 'Usuário não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  }
}
