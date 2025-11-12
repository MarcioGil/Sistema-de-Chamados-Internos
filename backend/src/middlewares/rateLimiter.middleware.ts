import rateLimit from 'express-rate-limit';

/**
 * Rate limiter global - proteção contra força bruta
 */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requisições por IP
  message: {
    error: 'Muitas requisições. Tente novamente mais tarde',
    code: 'RATE_LIMIT_EXCEEDED',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter para login - proteção extra contra ataques de força bruta
 */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // limite de 5 tentativas de login
  message: {
    error: 'Muitas tentativas de login. Tente novamente em 15 minutos',
    code: 'LOGIN_RATE_LIMIT_EXCEEDED',
  },
  skipSuccessfulRequests: true, // não conta requisições bem-sucedidas
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter para criação de recursos
 */
export const createResourceLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 10, // máximo 10 criações por minuto
  message: {
    error: 'Muitas criações em pouco tempo. Aguarde um momento',
    code: 'CREATE_RATE_LIMIT_EXCEEDED',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
