import { api } from './api';
import { User } from '../types';

export const userService = {
  /**
   * Lista todos os usuários (admin/atendente)
   */
  async getAllUsers(): Promise<User[]> {
    const response = await api.get<{ users: User[] }>('/users');
    return response.data.users;
  },

  /**
   * Busca usuário por ID
   */
  async getUserById(id: string): Promise<User> {
    const response = await api.get<{ user: User }>(`/users/${id}`);
    return response.data.user;
  },
};
