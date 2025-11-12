import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const prisma = new PrismaClient();

// Schemas de validação
export const createUserSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  role: z.enum(['USER', 'ATTENDANT', 'ADMIN']).default('USER'),
});

export const updateUserSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(['USER', 'ATTENDANT', 'ADMIN']).optional(),
  active: z.boolean().optional(),
});

export class UserService {
  /**
   * Lista todos os usuários
   */
  async findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  /**
   * Busca usuário por ID
   */
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }

  /**
   * Cria novo usuário
   */
  async create(data: z.infer<typeof createUserSchema>) {
    const validated = createUserSchema.parse(data);

    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(validated.password, 10);

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        password: hashedPassword,
        role: validated.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  /**
   * Atualiza usuário
   */
  async update(id: string, data: z.infer<typeof updateUserSchema>) {
    const validated = updateUserSchema.parse(data);

    // Verificar se usuário existe
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Se estiver alterando email, verificar se já não está em uso
    if (validated.email && validated.email !== user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: validated.email },
      });

      if (existingUser) {
        throw new Error('Email já está em uso');
      }
    }

    // Preparar dados para atualização
    const updateData: any = {};
    if (validated.name) updateData.name = validated.name;
    if (validated.email) updateData.email = validated.email;
    if (validated.role) updateData.role = validated.role;
    if (validated.active !== undefined) updateData.active = validated.active;

    // Hash da senha se fornecida
    if (validated.password) {
      updateData.password = await bcrypt.hash(validated.password, 10);
    }

    // Atualizar usuário
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  /**
   * Deleta usuário
   */
  async delete(id: string) {
    // Verificar se usuário existe
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Deletar usuário (soft delete seria melhor, mas por simplicidade usaremos delete)
    await prisma.user.delete({ where: { id } });
  }
}
