import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'
import { Dashboard } from './pages/Dashboard'
import { TicketList } from './pages/TicketList'
import { CreateTicket } from './pages/CreateTicket'
import { TicketDetails } from './pages/TicketDetails'
import { EditTicket } from './pages/EditTicket'
import './index.css'

// Componente temporário de Login
const Login = () => {
  const { login, isLoading, error } = useAuthStore()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login({ email, password })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">HelpDeskFlow</h1>
        <p className="text-gray-600 mb-6">Sistema de Chamados Internos</p>
        
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        
        <div className="mt-6 text-sm text-gray-500">
          <p className="font-medium mb-1">Usuários de teste:</p>
          <p>Admin: admin@helpdeskflow.com / Admin@123</p>
        </div>
      </div>
    </div>
  )
}

// Componente de rota protegida
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthStore()
  return token ? <>{children}</> : <Navigate to="/login" replace />
}

// App principal
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/tickets"
          element={
            <PrivateRoute>
              <TicketList />
            </PrivateRoute>
          }
        />
        <Route
          path="/tickets/new"
          element={
            <PrivateRoute>
              <CreateTicket />
            </PrivateRoute>
          }
        />
        <Route
          path="/tickets/:id"
          element={
            <PrivateRoute>
              <TicketDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/tickets/:id/edit"
          element={
            <PrivateRoute>
              <EditTicket />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
