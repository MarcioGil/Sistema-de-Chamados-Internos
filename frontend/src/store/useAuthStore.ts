import { create } from 'zustand';
import { User, LoginCredentials } from '@/types';
import { authService } from '@/services/auth.service';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: authService.getUser(),
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(credentials);
      authService.saveAuth(response.token, response.user);
      set({ user: response.user, token: response.token, isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.error || 'Erro ao fazer login', isLoading: false });
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    set({ user: null, token: null });
  },

  loadUser: async () => {
    if (!authService.isAuthenticated()) return;
    
    set({ isLoading: true });
    try {
      const response = await authService.me();
      set({ user: response.user, isLoading: false });
    } catch (error) {
      authService.logout();
      set({ user: null, token: null, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
