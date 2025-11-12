import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dashboardService } from '../services/dashboard.service'
import { DashboardMetrics } from '../types'
import { useAuthStore } from '../store/useAuthStore'
import { categoryLabels, priorityLabels, statusLabels } from '../utils/ticketHelpers'

export const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadMetrics()
  }, [])

  const loadMetrics = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await dashboardService.getMetrics()
      setMetrics(data)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar métricas')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Carregando dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !metrics) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error || 'Erro ao carregar métricas'}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">HelpDeskFlow</h1>
              <p className="text-sm text-gray-600 mt-1">
                Bem-vindo, {user?.name} ({user?.role === 'ADMIN' ? 'Administrador' : user?.role === 'ATTENDANT' ? 'Atendente' : 'Usuário'})
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/tickets')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Ver Chamados
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Tickets</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.summary.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Abertos</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{metrics.summary.open}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Em Progresso</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{metrics.summary.inProgress}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Concluídos</p>
                <p className="text-3xl font-bold text-gray-600 mt-2">{metrics.summary.completed}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Tickets por Categoria */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tickets por Categoria</h2>
            <div className="space-y-4">
              {metrics.byCategory.map((item) => {
                const percentage = metrics.summary.total > 0 
                  ? Math.round((item.count / metrics.summary.total) * 100) 
                  : 0
                
                return (
                  <div key={item.category}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {categoryLabels[item.category]}
                      </span>
                      <span className="text-sm text-gray-600">
                        {item.count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Tickets por Prioridade */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tickets por Prioridade</h2>
            <div className="space-y-4">
              {metrics.byPriority.map((item) => {
                const percentage = metrics.summary.total > 0 
                  ? Math.round((item.count / metrics.summary.total) * 100) 
                  : 0
                
                const colorClass = item.priority === 4 ? 'bg-red-600' : 
                                   item.priority === 3 ? 'bg-orange-500' : 
                                   item.priority === 2 ? 'bg-yellow-500' : 'bg-blue-500'
                
                return (
                  <div key={item.priority}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {priorityLabels[item.priority]}
                      </span>
                      <span className="text-sm text-gray-600">
                        {item.count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${colorClass} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Tickets Recentes */}
        {metrics.recentTickets && metrics.recentTickets.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Tickets Recentes</h2>
              <button
                onClick={() => navigate('/tickets')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Ver todos →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Criado em</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {metrics.recentTickets.slice(0, 5).map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => navigate(`/tickets/${ticket.id}`)}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">#{ticket.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{ticket.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{categoryLabels[ticket.category]}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {statusLabels[ticket.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(ticket.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => navigate('/tickets/new')}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Novo Chamado</p>
                <p className="text-sm text-gray-600">Criar ticket</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/tickets')}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Meus Tickets</p>
                <p className="text-sm text-gray-600">Ver chamados</p>
              </div>
            </div>
          </button>

          {(user?.role === 'ADMIN' || user?.role === 'ATTENDANT') && (
            <button
              onClick={() => navigate('/tickets')}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Atribuídos a Mim</p>
                  <p className="text-sm text-gray-600">Tickets pendentes</p>
                </div>
              </div>
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
