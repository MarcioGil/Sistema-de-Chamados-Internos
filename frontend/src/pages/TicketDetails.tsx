import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ticketService } from '../services/ticket.service'
import { TicketDetail } from '../types'
import { useAuthStore } from '../store/useAuthStore'
import { 
  priorityColors, 
  priorityLabels, 
  statusColors, 
  statusLabels, 
  categoryLabels 
} from '../utils/ticketHelpers'

export const TicketDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [ticket, setTicket] = useState<TicketDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadTicket()
  }, [id])

  const loadTicket = async () => {
    if (!id) return

    try {
      setIsLoading(true)
      setError(null)
      const data = await ticketService.getById(id)
      setTicket(data)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar ticket')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const canEdit = () => {
    if (!ticket || !user) return false
    return (
      user.role === 'ADMIN' ||
      user.role === 'ATTENDANT' ||
      (user.id === ticket.createdById && ticket.status === 'OPEN')
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Carregando ticket...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error || 'Ticket não encontrado'}
          </div>
          <button
            onClick={() => navigate('/tickets')}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            ← Voltar para lista
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/tickets')}
            className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2"
          >
            ← Voltar para lista
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Chamado #{ticket.id}</h1>
              <p className="text-gray-600 mt-1">{ticket.title}</p>
            </div>
            {canEdit() && (
              <button
                onClick={() => navigate(`/tickets/${ticket.id}/edit`)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Editar
              </button>
            )}
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {/* Status and Priority */}
          <div className="flex gap-4 mb-6">
            <div>
              <span className="text-sm text-gray-500 block mb-1">Status</span>
              <span
                className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${
                  statusColors[ticket.status]
                }`}
              >
                {statusLabels[ticket.status]}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-500 block mb-1">Prioridade</span>
              <span
                className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${
                  priorityColors[ticket.priority]
                }`}
              >
                {priorityLabels[ticket.priority]}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-500 block mb-1">Categoria</span>
              <span className="px-3 py-1 inline-flex text-sm font-semibold rounded-full bg-gray-100 text-gray-800">
                {categoryLabels[ticket.category]}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Descrição</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Criado por</h3>
              <p className="text-gray-900">{ticket.createdBy.name}</p>
              <p className="text-sm text-gray-500">{ticket.createdBy.email}</p>
              <p className="text-xs text-gray-400 mt-1">{formatDate(ticket.createdAt)}</p>
            </div>

            {ticket.assignedTo && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Atribuído para</h3>
                <p className="text-gray-900">{ticket.assignedTo.name}</p>
                <p className="text-sm text-gray-500">{ticket.assignedTo.email}</p>
              </div>
            )}

            {!ticket.assignedTo && (user?.role === 'ATTENDANT' || user?.role === 'ADMIN') && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Atribuído para</h3>
                <p className="text-sm text-gray-400 italic">Nenhum atendente atribuído</p>
              </div>
            )}
          </div>

          {ticket.updatedAt !== ticket.createdAt && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-400">
                Última atualização: {formatDate(ticket.updatedAt)}
              </p>
            </div>
          )}
        </div>

        {/* Comments Section - Placeholder */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Comentários</h2>
          <p className="text-gray-500 text-center py-8">
            Sistema de comentários será implementado em breve
          </p>
        </div>
      </div>
    </div>
  )
}
