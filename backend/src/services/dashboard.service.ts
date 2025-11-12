import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DashboardService {
  /**
   * Retorna métricas gerais do sistema
   */
  async getMetrics(userRole: string, userId?: string) {
    const whereClause = userRole === 'USER' ? { createdById: userId } : {};

    const [
      totalTickets,
      openTickets,
      inProgressTickets,
      completedTickets,
      ticketsByCategory,
      ticketsByPriority,
      recentTickets,
    ] = await Promise.all([
      prisma.ticket.count({ where: whereClause }),
      prisma.ticket.count({ where: { ...whereClause, status: 'OPEN' } }),
      prisma.ticket.count({
        where: { ...whereClause, status: { in: ['IN_ANALYSIS', 'IN_PROGRESS'] } },
      }),
      prisma.ticket.count({ where: { ...whereClause, status: 'COMPLETED' } }),
      prisma.ticket.groupBy({
        by: ['category'],
        where: whereClause,
        _count: { id: true },
      }),
      prisma.ticket.groupBy({
        by: ['priority'],
        where: whereClause,
        _count: { id: true },
      }),
      prisma.ticket.findMany({
        where: whereClause,
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          createdBy: {
            select: { id: true, name: true },
          },
          assignedTo: {
            select: { id: true, name: true },
          },
        },
      }),
    ]);

    // Métricas de atendente (apenas para ATTENDANT e ADMIN)
    let attendantMetrics = null;
    if (userRole !== 'USER') {
      const ticketsByAttendant = await prisma.ticket.groupBy({
        by: ['assignedToId'],
        _count: { id: true },
        where: {
          assignedToId: { not: null },
        },
      });

      // Busca nomes dos atendentes
      const attendantIds = ticketsByAttendant
        .map((t) => t.assignedToId)
        .filter((id): id is string => id !== null);

      const attendants = await prisma.user.findMany({
        where: { id: { in: attendantIds } },
        select: { id: true, name: true },
      });

      attendantMetrics = ticketsByAttendant.map((item) => {
        const attendant = attendants.find((a) => a.id === item.assignedToId);
        return {
          attendantId: item.assignedToId,
          attendantName: attendant?.name || 'N/A',
          count: item._count.id,
        };
      });
    }

    // Tempo médio de resolução (apenas tickets completados)
    const completedTicketsWithDates = await prisma.ticket.findMany({
      where: { ...whereClause, status: 'COMPLETED' },
      select: {
        createdAt: true,
        updatedAt: true,
      },
    });

    const avgResolutionTime =
      completedTicketsWithDates.length > 0
        ? completedTicketsWithDates.reduce((acc, ticket) => {
            const diff = ticket.updatedAt.getTime() - ticket.createdAt.getTime();
            return acc + diff;
          }, 0) / completedTicketsWithDates.length
        : 0;

    // Converte para horas
    const avgResolutionHours = Math.round(avgResolutionTime / (1000 * 60 * 60));

    return {
      summary: {
        total: totalTickets,
        open: openTickets,
        inProgress: inProgressTickets,
        completed: completedTickets,
      },
      byCategory: ticketsByCategory.map((item) => ({
        category: item.category,
        count: item._count.id,
      })),
      byPriority: ticketsByPriority.map((item) => ({
        priority: item.priority,
        count: item._count.id,
      })),
      avgResolutionHours,
      recentTickets,
      attendantMetrics,
    };
  }

  /**
   * Retorna tickets por período (últimos 7 dias)
   */
  async getTicketsTrend(userRole: string, userId?: string) {
    const whereClause = userRole === 'USER' ? { createdById: userId } : {};
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const tickets = await prisma.ticket.findMany({
      where: {
        ...whereClause,
        createdAt: { gte: sevenDaysAgo },
      },
      select: {
        createdAt: true,
        status: true,
      },
    });

    // Agrupa por dia
    const trendData: Record<string, { date: string; count: number }> = {};

    tickets.forEach((ticket) => {
      const dateKey = ticket.createdAt.toISOString().split('T')[0];
      if (!trendData[dateKey]) {
        trendData[dateKey] = { date: dateKey, count: 0 };
      }
      trendData[dateKey].count++;
    });

    return Object.values(trendData).sort((a, b) => a.date.localeCompare(b.date));
  }
}
