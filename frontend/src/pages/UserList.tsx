import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userService } from '../services/user.service'
import { User, UserRole } from '../types'
import { useAuthStore } from '../store/useAuthStore'

const roleLabels: Record<UserRole, string> = {
  ADMIN: 'Administrador',
  ATTENDANT: 'Atendente',
  USER: 'Usuário',
}

const roleColors: Record<UserRole, string> = {
  ADMIN: 'bg-red-100 text-red-800',
  ATTENDANT: 'bg-blue-100 text-blue-800',
  USER: 'bg-gray-100 text-gray-800',
}

export const UserList: React.FC = () => {
  const navigate = useNavigate()
  const { user: currentUser, logout } = useAuthStore()
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    // Verificar permissão
    if (currentUser?.role !== 'ADMIN') {
      navigate('/dashboard')
      return
    }

    loadUsers()
  }, [currentUser, navigate])

  const loadUsers = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await userService.getAllUsers()
      setUsers(data)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar usuários')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await userService.delete(id)
      setDeleteConfirm(null)
      await loadUsers()
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erro ao deletar usuário')
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Carregando usuários...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gerenciar Usuários</h1>
            <p className="text-gray-600 mt-1">
              Bem-vindo, {currentUser?.name} ({roleLabels[currentUser?.role || 'USER']})
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-white text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium border border-gray-300"
            >
              Voltar ao Dashboard
            </button>
            <button
              onClick={logout}
              className="bg-white text-red-600 px-6 py-2 rounded-lg hover:bg-red-50 transition-colors font-medium border border-red-300"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Total: <span className="font-semibold">{users.length}</span> usuários
          </p>
          <button
            onClick={() => navigate('/users/new')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            + Novo Usuário
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Perfil
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Criado em
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          roleColors[user.role]
                        }`}
                      >
                        {roleLabels[user.role]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {user.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => navigate(`/users/${user.id}/edit`)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Editar
                        </button>
                        {user.id !== currentUser?.id && (
                          <>
                            {deleteConfirm === user.id ? (
                              <>
                                <span className="text-gray-400">|</span>
                                <button
                                  onClick={() => handleDelete(user.id)}
                                  className="text-red-600 hover:text-red-900 font-semibold"
                                >
                                  Confirmar?
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(null)}
                                  className="text-gray-600 hover:text-gray-900"
                                >
                                  Cancelar
                                </button>
                              </>
                            ) : (
                              <>
                                <span className="text-gray-400">|</span>
                                <button
                                  onClick={() => setDeleteConfirm(user.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Deletar
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum usuário encontrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
