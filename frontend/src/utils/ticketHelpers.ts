import { TicketStatus, TicketCategory } from '../types'

// Mapeamento de Status
export const statusColors: Record<TicketStatus, string> = {
  OPEN: 'bg-green-100 text-green-800',
  IN_ANALYSIS: 'bg-blue-100 text-blue-800',
  IN_PROGRESS: 'bg-purple-100 text-purple-800',
  COMPLETED: 'bg-gray-100 text-gray-800',
  CANCELLED: 'bg-red-100 text-red-800',
}

export const statusLabels: Record<TicketStatus, string> = {
  OPEN: 'Aberto',
  IN_ANALYSIS: 'Em Análise',
  IN_PROGRESS: 'Em Progresso',
  COMPLETED: 'Concluído',
  CANCELLED: 'Cancelado',
}

// Mapeamento de Categoria
export const categoryLabels: Record<TicketCategory, string> = {
  TI: 'TI',
  RH: 'RH',
  FINANCEIRO: 'Financeiro',
  COMPRAS: 'Compras',
  INFRAESTRUTURA: 'Infraestrutura',
}

// Mapeamento de Prioridade
export const priorityColors: Record<number, string> = {
  1: 'bg-blue-100 text-blue-800',
  2: 'bg-yellow-100 text-yellow-800',
  3: 'bg-orange-100 text-orange-800',
  4: 'bg-red-100 text-red-800',
}

export const priorityLabels: Record<number, string> = {
  1: 'Baixa',
  2: 'Média',
  3: 'Alta',
  4: 'Urgente',
}

// Arrays para formulários
export const categories: { value: TicketCategory; label: string }[] = [
  { value: 'TI', label: 'TI' },
  { value: 'RH', label: 'RH' },
  { value: 'FINANCEIRO', label: 'Financeiro' },
  { value: 'COMPRAS', label: 'Compras' },
  { value: 'INFRAESTRUTURA', label: 'Infraestrutura' },
]

export const priorities: { value: number; label: string }[] = [
  { value: 1, label: 'Baixa' },
  { value: 2, label: 'Média' },
  { value: 3, label: 'Alta' },
  { value: 4, label: 'Urgente' },
]

export const statuses: { value: TicketStatus; label: string }[] = [
  { value: 'OPEN', label: 'Aberto' },
  { value: 'IN_ANALYSIS', label: 'Em Análise' },
  { value: 'IN_PROGRESS', label: 'Em Progresso' },
  { value: 'COMPLETED', label: 'Concluído' },
]
