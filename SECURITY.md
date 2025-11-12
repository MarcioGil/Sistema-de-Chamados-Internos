# 🔒 Guia de Segurança - HelpDeskFlow

## Práticas de Segurança Implementadas

Este documento descreve todas as medidas de segurança implementadas no HelpDeskFlow para garantir proteção contra vulnerabilidades comuns (OWASP Top 10) e conformidade com melhores práticas.

---

## 1. Autenticação e Autorização

### ✅ JSON Web Tokens (JWT)
- **Expiração**: 7 dias (configurável)
- **Algoritmo**: HS256
- **Secret**: Gerado com 64 bytes de entropia
- **Payload**: ID do usuário e role
- **Renovação**: Refresh token implementado

```typescript
// Geração segura do JWT
jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET!,
  { expiresIn: '7d' }
);
```

### ✅ Bcrypt para Senhas
- **Rounds**: 12 (recomendado para segurança alta)
- **Salt**: Automático por hash
- **Tempo**: ~200-300ms por hash (previne brute force)

```typescript
const hash = await bcrypt.hash(password, 12);
```

### ✅ RBAC (Role-Based Access Control)
- **Roles**: USER, ATTENDANT, ADMIN
- **Middlewares**: Verificação por endpoint
- **Princípio do menor privilégio**

---

## 2. Proteção de API

### ✅ Helmet.js
Headers de segurança HTTP configurados:

```typescript
app.use(helmet({
  contentSecurityPolicy: true,
  xssFilter: true,
  noSniff: true,
  ieNoOpen: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

**Headers configurados**:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000`

### ✅ Rate Limiting
Proteção contra ataques de força bruta:

```typescript
// Global: 100 requisições por 15 minutos
globalLimiter: {
  windowMs: 15 * 60 * 1000,
  max: 100
}

// Login: 5 tentativas por 15 minutos
loginLimiter: {
  windowMs: 15 * 60 * 1000,
  max: 5
}
```

### ✅ CORS Configurado
Apenas origens permitidas:

```typescript
cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
})
```

---

## 3. Validação e Sanitização

### ✅ Zod Schemas
Validação rigorosa de todos os inputs:

```typescript
const createTicketSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(10).max(5000),
  category: z.enum(['TI', 'RH', 'FINANCEIRO', 'COMPRAS', 'INFRAESTRUTURA']),
  priority: z.number().min(1).max(4)
});
```

### ✅ XSS Protection
Sanitização de HTML/scripts maliciosos:

```typescript
import xss from 'xss';

function sanitizeInput(input: string): string {
  return xss(input, {
    whiteList: {}, // Remove todas as tags
    stripIgnoreTag: true
  });
}
```

### ✅ SQL Injection Prevention
Prisma ORM com prepared statements automático:

```typescript
// Prisma automaticamente sanitiza
await prisma.ticket.findMany({
  where: { title: { contains: userInput } }
});
```

### ✅ NoSQL Injection Prevention
Sanitização de operadores MongoDB:

```typescript
import mongoSanitize from 'express-mongo-sanitize';
app.use(mongoSanitize());
```

---

## 4. Proteção Contra Vulnerabilidades

### ✅ Cross-Site Request Forgery (CSRF)
- JWT em header (não em cookies)
- SameSite cookies quando necessário
- Verificação de origem

### ✅ Clickjacking
```typescript
helmet.frameguard({ action: 'deny' })
```

### ✅ HTTP Parameter Pollution (HPP)
```typescript
import hpp from 'hpp';
app.use(hpp());
```

### ✅ Denial of Service (DoS)
- Rate limiting global
- Timeout em requisições (30s)
- Body size limit (10MB)
- Validação de tamanho de arquivos

```typescript
app.use(express.json({ limit: '10mb' }));
```

---

## 5. Segurança em Produção

### ✅ Variáveis de Ambiente
```env
# NUNCA committar este arquivo
DATABASE_URL=postgresql://...
JWT_SECRET=...
NODE_ENV=production
```

### ✅ HTTPS Obrigatório
```typescript
if (process.env.NODE_ENV === 'production' && !req.secure) {
  return res.redirect('https://' + req.headers.host + req.url);
}
```

### ✅ Logs de Segurança
```typescript
// Log de tentativas de login
logger.warn(`Failed login attempt for ${email} from ${ip}`);

// Log de alterações sensíveis
logger.info(`User ${userId} changed role of user ${targetId}`);
```

### ✅ Error Handling Seguro
Nunca expor detalhes internos:

```typescript
// ❌ ERRADO
res.status(500).json({ error: error.stack });

// ✅ CORRETO
res.status(500).json({ 
  success: false,
  message: 'Erro interno do servidor' 
});
```

---

## 6. Acessibilidade e Segurança

### ✅ WCAG 2.1 Level AA
- Autenticação acessível
- Feedback claro de erros
- Timeouts com avisos
- Suporte a leitores de tela

### ✅ Proteção de Dados Sensíveis
- Senhas nunca retornadas em respostas
- Dados pessoais protegidos por RBAC
- Logs não contêm informações sensíveis

```typescript
// Sempre remover senha antes de retornar usuário
const { passwordHash, ...user } = userData;
return user;
```

---

## 7. Checklist de Segurança

### Backend
- [x] JWT com secret forte e expiração
- [x] Bcrypt com 12+ rounds
- [x] Helmet configurado
- [x] Rate limiting implementado
- [x] CORS restritivo
- [x] Validação com Zod
- [x] Sanitização de inputs
- [x] Prisma ORM (SQL injection safe)
- [x] HTTPS em produção
- [x] Logs de segurança
- [x] Error handling seguro
- [x] Timeouts configurados

### Frontend
- [x] Tokens em localStorage seguro
- [x] Logout ao expirar token
- [x] HTTPS obrigatório
- [x] Sanitização de inputs
- [x] Validação client-side
- [x] CSP headers
- [x] Sem dados sensíveis em URLs
- [x] Acessibilidade completa

---

## 8. Testes de Segurança

### Ferramentas Recomendadas
- **OWASP ZAP**: Scan de vulnerabilidades
- **Snyk**: Análise de dependências
- **npm audit**: Vulnerabilidades em pacotes
- **SonarQube**: Análise de código

```bash
# Verificar vulnerabilidades
npm audit
npm audit fix

# Análise de segurança
npx snyk test
```

---

## 9. Resposta a Incidentes

### Procedimentos
1. **Identificação**: Logs e monitoramento
2. **Contenção**: Revogar tokens comprometidos
3. **Erradicação**: Patch de vulnerabilidade
4. **Recuperação**: Restaurar serviços
5. **Lições**: Documentar e melhorar

### Contatos
- Desenvolvedor: Marcio Gil
- Email: [disponível no perfil]
- GitHub: [@MarcioGil](https://github.com/MarcioGil)

---

## 10. Conformidade

### LGPD (Lei Geral de Proteção de Dados)
- ✅ Consentimento para coleta de dados
- ✅ Direito de acesso e exclusão
- ✅ Criptografia de dados sensíveis
- ✅ Logs de acesso a dados

### OWASP Top 10 (2021)
- ✅ A01:2021 - Broken Access Control
- ✅ A02:2021 - Cryptographic Failures
- ✅ A03:2021 - Injection
- ✅ A05:2021 - Security Misconfiguration
- ✅ A07:2021 - Identification and Authentication Failures

---

## 📚 Referências

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [JWT Best Practices](https://datatracker.ietf.org/doc/html/rfc8725)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Desenvolvido com segurança em mente por Marcio Gil** 🔒
