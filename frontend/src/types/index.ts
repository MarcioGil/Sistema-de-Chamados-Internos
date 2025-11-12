// Tipos de usuário
export type UserRole = 'USER' | 'ATTENDANT' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
}

// Tipos de ticket
export type TicketStatus = 'OPEN' | 'IN_ANALYSIS' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type TicketCategory = 'TI' | 'RH' | 'FINANCEIRO' | 'COMPRAS' | 'INFRAESTRUTURA';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: TicketCategory;
  status: TicketStatus;
  priority: number;
  attachments: string[];
  createdById: string;
  assignedToId: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  assignedTo: {
    id: string;
    name: string;
    email: string;
  } | null;
  _count?: {
    comments: number;
  };
}

export interface TicketDetail extends Ticket {
  comments: Comment[];
  history: TicketHistory[];
}

export interface Comment {
  id: string;
  message: string;
  ticketId: string;
  userId: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface TicketHistory {
  id: string;
  ticketId: string;
  oldStatus: TicketStatus;
  newStatus: TicketStatus;
  changedAt: string;
  changedBy: {
    id: string;
    name: string;
  };
}

// Tipos de formulários
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface CreateTicketData {
  title: string;
  description: string;
  category: TicketCategory;
  priority: number;
}

export interface UpdateTicketData {
  title?: string;
  description?: string;
  category?: TicketCategory;
  priority?: number;
  status?: TicketStatus;
  assignedToId?: string | null;
}

// Tipos de filtros
export interface TicketFilters {
  status?: TicketStatus;
  category?: TicketCategory;
  assignedToMe?: boolean;
  createdByMe?: boolean;
  page?: number;
  limit?: number;
}

// Tipos de resposta da API
export interface ApiResponse<T> {
  message?: string;
  data?: T;
  error?: string;
  code?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface TicketListResponse {
  tickets: Ticket[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Tipos de Dashboard
export interface DashboardMetrics {
  summary: {
    total: number;
    open: number;
    inProgress: number;
    completed: number;
  };
  byCategory: Array<{
    category: TicketCategory;
    count: number;
  }>;
  byPriority: Array<{
    priority: number;
    count: number;
  }>;
  avgResolutionHours: number;
  recentTickets: Ticket[];
  attendantMetrics: Array<{
    attendantId: string | null;
    attendantName: string;
    count: number;
  }> | null;
}

export interface TrendData {
  date: string;
  count: number;
}
