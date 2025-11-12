import { api } from './api';
import { User } from '../types';

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: 'USER' | 'ATTENDANT' | 'ADMIN';
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  role?: 'USER' | 'ATTENDANT' | 'ADMIN';
  active?: boolean;
}

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

  /**
   * Cria novo usuário (admin apenas)
   */
  async create(data: CreateUserData): Promise<User> {
    const response = await api.post<{ user: User }>('/users', data);
    return response.data.user;
  },

  /**
   * Atualiza usuário (admin apenas)
   */
  async update(id: string, data: UpdateUserData): Promise<User> {
    const response = await api.patch<{ user: User }>(`/users/${id}`, data);
    return response.data.user;
  },

  /**
   * Deleta usuário (admin apenas)
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },
};
