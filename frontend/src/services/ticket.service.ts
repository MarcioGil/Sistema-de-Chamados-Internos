import { api } from './api';
import {
  Ticket,
  TicketDetail,
  CreateTicketData,
  UpdateTicketData,
  TicketFilters,
  TicketListResponse,
  Comment,
} from '@/types';

export const ticketService = {
  /**
   * Lista tickets com filtros
   */
  async list(filters?: TicketFilters): Promise<TicketListResponse> {
    const response = await api.get<TicketListResponse>('/tickets', { params: filters });
    return response.data;
  },

  /**
   * Busca ticket por ID
   */
  async getById(id: string): Promise<TicketDetail> {
    const response = await api.get<{ ticket: TicketDetail }>(`/tickets/${id}`);
    return response.data.ticket;
  },

  /**
   * Cria novo ticket
   */
  async create(data: CreateTicketData): Promise<Ticket> {
    const response = await api.post<{ ticket: Ticket }>('/tickets', data);
    return response.data.ticket;
  },

  /**
   * Atualiza ticket
   */
  async update(id: string, data: UpdateTicketData): Promise<Ticket> {
    const response = await api.patch<{ ticket: Ticket }>(`/tickets/${id}`, data);
    return response.data.ticket;
  },

  /**
   * Deleta ticket (Admin apenas)
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/tickets/${id}`);
  },

  /**
   * Adiciona comentário
   */
  async addComment(ticketId: string, message: string): Promise<Comment> {
    const response = await api.post<{ comment: Comment }>(`/tickets/${ticketId}/comments`, {
      message,
    });
    return response.data.comment;
  },
};
