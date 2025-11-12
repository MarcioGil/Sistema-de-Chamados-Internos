import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ticketService } from '../services/ticket.service'
import { Ticket } from '../types'
import { useAuthStore } from '../store/useAuthStore'

const priorityColors = {
  baixa: 'bg-blue-100 text-blue-800',
  media: 'bg-yellow-100 text-yellow-800',
  alta: 'bg-orange-100 text-orange-800',
  urgente: 'bg-red-100 text-red-800',
}

const statusColors = {
  aberto: 'bg-green-100 text-green-800',
  em_analise: 'bg-blue-100 text-blue-800',
  em_progresso: 'bg-purple-100 text-purple-800',
  concluido: 'bg-gray-100 text-gray-800',
}

const statusLabels = {
  aberto: 'Aberto',
  em_analise: 'Em Análise',
  em_progresso: 'Em Progresso',
  concluido: 'Concluído',
}

const categoryLabels = {
  ti: 'TI',
  rh: 'RH',
  financeiro: 'Financeiro',
  compras: 'Compras',
  infraestrutura: 'Infraestrutura',
}

export const TicketList: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'my-tickets' | 'assigned-to-me'>('all')

  useEffect(() => {
    loadTickets()
  }, [filter])

  const loadTickets = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      let filterParams: any = {}
      
      if (filter === 'my-tickets') {
        filterParams.createdBy = user?.id
      } else if (filter === 'assigned-to-me') {
        filterParams.assignedTo = user?.id
      }
      
      const response = await ticketService.list(filterParams)
      setTickets(response.tickets)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar tickets')
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Chamados</h1>
            <p className="text-gray-600 mt-1">Gerencie todos os tickets do sistema</p>
          </div>
          <button
            onClick={() => navigate('/tickets/new')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            + Novo Chamado
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos os Tickets
            </button>
            <button
              onClick={() => setFilter('my-tickets')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'my-tickets'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Meus Tickets
            </button>
            {user?.role !== 'usuario' && (
              <button
                onClick={() => setFilter('assigned-to-me')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'assigned-to-me'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Atribuídos a Mim
              </button>
            )}
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Carregando tickets...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Tickets List */}
        {!isLoading && !error && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {tickets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Nenhum ticket encontrado</p>
                <button
                  onClick={() => navigate('/tickets/new')}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Criar primeiro ticket
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Título
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoria
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prioridade
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Criado em
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => navigate(`/tickets/${ticket.id}`)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{ticket.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="font-medium">{ticket.title}</div>
                          <div className="text-gray-500 text-xs mt-1">
                            por {ticket.createdBy.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {categoryLabels[ticket.category]}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              priorityColors[ticket.priority]
                            }`}
                          >
                            {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              statusColors[ticket.status]
                            }`}
                          >
                            {statusLabels[ticket.status]}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(ticket.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              navigate(`/tickets/${ticket.id}`)
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Ver detalhes
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
