import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Schemas de validação
export const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter ao menos uma letra maiúscula')
    .regex(/[a-z]/, 'Senha deve conter ao menos uma letra minúscula')
    .regex(/[0-9]/, 'Senha deve conter ao menos um número')
    .regex(/[^A-Za-z0-9]/, 'Senha deve conter ao menos um caractere especial'),
  role: z.enum(['USER', 'ATTENDANT', 'ADMIN']).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export class AuthService {
  /**
   * Registra um novo usuário
   */
  async register(data: z.infer<typeof registerSchema>) {
    const validated = registerSchema.parse(data);

    // Verifica se o email já está em uso
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      throw new Error('EMAIL_ALREADY_EXISTS');
    }

    // Hash da senha com bcrypt (salt rounds = 12 para alta segurança)
    const passwordHash = await bcrypt.hash(validated.password, 12);

    // Cria o usuário
    const user = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        passwordHash,
        role: validated.role || 'USER',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }

  /**
   * Realiza login e retorna o token JWT
   */
  async login(data: z.infer<typeof loginSchema>) {
    const validated = loginSchema.parse(data);

    // Busca o usuário
    const user = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (!user) {
      throw new Error('INVALID_CREDENTIALS');
    }

    // Verifica se o usuário está ativo
    if (!user.active) {
      throw new Error('USER_INACTIVE');
    }

    // Verifica a senha
    const isPasswordValid = await bcrypt.compare(
      validated.password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      throw new Error('INVALID_CREDENTIALS');
    }

    // Gera o token JWT
    const token = this.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  /**
   * Gera um token JWT
   */
  private generateToken(payload: {
    userId: string;
    email: string;
    role: string;
  }) {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT_SECRET não configurado');
    }

    return jwt.sign(payload, secret, {
      expiresIn: '7d', // Token válido por 7 dias
      issuer: 'helpdeskflow',
      subject: payload.userId,
    });
  }

  /**
   * Verifica um token JWT
   */
  verifyToken(token: string) {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT_SECRET não configurado');
    }

    return jwt.verify(token, secret);
  }
}
