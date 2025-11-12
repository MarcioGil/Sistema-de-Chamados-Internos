import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpa dados existentes (cuidado em produção!)
  await prisma.ticketHistory.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Dados antigos removidos');

  // Cria usuários
  const adminPassword = await bcrypt.hash('Admin@123', 12);
  const attendantPassword = await bcrypt.hash('Atendente@123', 12);
  const userPassword = await bcrypt.hash('Usuario@123', 12);

  const admin = await prisma.user.create({
    data: {
      name: 'Administrador',
      email: 'admin@helpdeskflow.com',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  });

  const attendant1 = await prisma.user.create({
    data: {
      name: 'João Silva',
      email: 'joao.silva@helpdeskflow.com',
      passwordHash: attendantPassword,
      role: 'ATTENDANT',
    },
  });

  const attendant2 = await prisma.user.create({
    data: {
      name: 'Maria Santos',
      email: 'maria.santos@helpdeskflow.com',
      passwordHash: attendantPassword,
      role: 'ATTENDANT',
    },
  });

  const user1 = await prisma.user.create({
    data: {
      name: 'Carlos Oliveira',
      email: 'carlos.oliveira@helpdeskflow.com',
      passwordHash: userPassword,
      role: 'USER',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Ana Paula',
      email: 'ana.paula@helpdeskflow.com',
      passwordHash: userPassword,
      role: 'USER',
    },
  });

  console.log('✅ Usuários criados');

  // Cria tickets de exemplo
  const ticket1 = await prisma.ticket.create({
    data: {
      title: 'Computador não liga',
      description:
        'Meu computador do setor não está ligando. Já tentei verificar os cabos mas não funcionou.',
      category: 'TI',
      priority: 3,
      status: 'OPEN',
      createdById: user1.id,
    },
  });

  const ticket2 = await prisma.ticket.create({
    data: {
      title: 'Atualização de dados cadastrais',
      description: 'Preciso atualizar meu endereço e telefone no sistema.',
      category: 'RH',
      priority: 1,
      status: 'IN_ANALYSIS',
      createdById: user2.id,
      assignedToId: attendant1.id,
    },
  });

  const ticket3 = await prisma.ticket.create({
    data: {
      title: 'Reembolso de despesas',
      description: 'Solicito reembolso de despesas de viagem realizada em outubro.',
      category: 'FINANCEIRO',
      priority: 2,
      status: 'IN_PROGRESS',
      createdById: user1.id,
      assignedToId: attendant2.id,
    },
  });

  const ticket4 = await prisma.ticket.create({
    data: {
      title: 'Solicitação de material de escritório',
      description: 'Precisamos de mais papel A4 e canetas para o setor.',
      category: 'COMPRAS',
      priority: 1,
      status: 'COMPLETED',
      createdById: user2.id,
      assignedToId: attendant1.id,
    },
  });

  console.log('✅ Tickets criados');

  // Cria comentários
  await prisma.comment.create({
    data: {
      message: 'Vou verificar o problema ainda hoje.',
      ticketId: ticket2.id,
      userId: attendant1.id,
    },
  });

  await prisma.comment.create({
    data: {
      message: 'Obrigado pelo retorno!',
      ticketId: ticket2.id,
      userId: user2.id,
    },
  });

  console.log('✅ Comentários criados');

  // Cria histórico
  await prisma.ticketHistory.create({
    data: {
      ticketId: ticket2.id,
      oldStatus: 'OPEN',
      newStatus: 'IN_ANALYSIS',
      changedById: attendant1.id,
    },
  });

  await prisma.ticketHistory.create({
    data: {
      ticketId: ticket3.id,
      oldStatus: 'OPEN',
      newStatus: 'IN_ANALYSIS',
      changedById: attendant2.id,
    },
  });

  await prisma.ticketHistory.create({
    data: {
      ticketId: ticket3.id,
      oldStatus: 'IN_ANALYSIS',
      newStatus: 'IN_PROGRESS',
      changedById: attendant2.id,
    },
  });

  await prisma.ticketHistory.create({
    data: {
      ticketId: ticket4.id,
      oldStatus: 'OPEN',
      newStatus: 'COMPLETED',
      changedById: attendant1.id,
    },
  });

  console.log('✅ Histórico criado');

  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║        ✅ Seed concluído com sucesso!                ║
║                                                       ║
║        Usuários criados:                              ║
║        - admin@helpdeskflow.com (Admin@123)           ║
║        - joao.silva@helpdeskflow.com (Atendente@123)  ║
║        - maria.santos@helpdeskflow.com (Atendente@123)║
║        - carlos.oliveira@helpdeskflow.com (Usuario@123)║
║        - ana.paula@helpdeskflow.com (Usuario@123)     ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
