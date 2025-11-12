import { api } from './api';
import { LoginCredentials, RegisterData, LoginResponse, User } from '@/types';

export const authService = {
  /**
   * Realiza login
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  /**
   * Registra novo usuário
   */
  async register(data: RegisterData): Promise<{ user: User }> {
    const response = await api.post<{ user: User }>('/auth/register', data);
    return response.data;
  },

  /**
   * Busca dados do usuário autenticado
   */
  async me(): Promise<{ user: User }> {
    const response = await api.get<{ user: User }>('/auth/me');
    return response.data;
  },

  /**
   * Salva token e usuário no localStorage
   */
  saveAuth(token: string, user: User): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  /**
   * Remove dados de autenticação
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Verifica se está autenticado
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  /**
   * Retorna usuário do localStorage
   */
  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};
