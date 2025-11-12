import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routes from './routes';
import { errorHandler, notFoundHandler, globalLimiter, sanitizeInput } from './middlewares';

// Carrega variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

// Middlewares de segurança
app.use(helmet()); // Headers de segurança
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Rate limiting global
app.use(globalLimiter);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sanitização de inputs (previne XSS)
app.use(sanitizeInput);

// Log de requisições (desenvolvimento)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// Rotas da API
app.use('/api', routes);

// Tratamento de rotas não encontradas
app.use(notFoundHandler);

// Tratamento global de erros (sempre por último)
app.use(errorHandler);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║        🎫 HelpDeskFlow API - Servidor Rodando       ║
║                                                       ║
║        URL: http://localhost:${PORT}                   ║
║        Ambiente: ${process.env.NODE_ENV || 'development'}              ║
║        Docs: http://localhost:${PORT}/api/health        ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});

// Tratamento de erros não capturados
process.on('uncaughtException', (error) => {
  console.error('❌ Erro não capturado:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promise rejeitada não tratada:', reason);
  process.exit(1);
});

export default app;
