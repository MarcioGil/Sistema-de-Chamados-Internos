# 🚀 Guia Rápido de Deploy - HelpDeskFlow

## Deploy Completo em 10 Minutos

### 📦 1. Banco de Dados (Render PostgreSQL)

```bash
# Acesse: https://dashboard.render.com/
# New + → PostgreSQL
# Name: helpdeskflow-db
# Plan: Free
# Copie a "Internal Database URL"
```

### 🔧 2. Backend (Render)

```bash
# No Render Dashboard:
# New + → Web Service
# Conecte: MarcioGil/HelpDeskFlow
# Root Directory: backend
# Build: npm install && npx prisma generate && npm run build
# Start: npx prisma migrate deploy && npm start

# Environment Variables:
NODE_ENV=production
DATABASE_URL=[Internal Database URL copiada]
JWT_SECRET=[node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"]
FRONTEND_URL=https://helpdeskflow.vercel.app
```

### 🎨 3. Frontend (Vercel)

```bash
# Opção A: Dashboard
# Acesse: https://vercel.com/new
# Import: MarcioGil/HelpDeskFlow
# Root Directory: frontend
# Framework: Vite

# Environment Variables:
VITE_API_URL=https://[sua-api].onrender.com/api

# Opção B: CLI
cd frontend
npm install -g vercel
vercel login
vercel --prod
# Depois adicione: vercel env add VITE_API_URL production
```

### ✅ 4. Verificar

```bash
# Backend Health Check
curl https://[sua-api].onrender.com/api/health

# Frontend
https://[seu-app].vercel.app
```

### 👤 5. Popular Dados (Seed)

```bash
# No Render Dashboard → Shell
npm run prisma:seed

# Usuários de teste:
# admin@helpdeskflow.com / Admin@123
# joao.silva@helpdeskflow.com / Atendente@123
# carlos.oliveira@helpdeskflow.com / Usuario@123
```

---

## 🔗 Links Úteis

- [Guia Detalhado Backend](./backend/DEPLOY_RENDER.md)
- [Guia Detalhado Frontend](./frontend/DEPLOY_VERCEL.md)
- [Documentação Render](https://render.com/docs)
- [Documentação Vercel](https://vercel.com/docs)

---

## ⚠️ Observações Importantes

1. **Render Free Tier** hiberna após 15 min de inatividade
2. Primeiro acesso pode levar até 30 segundos
3. Para produção, considere planos pagos
4. Sempre use HTTPS em produção
5. Configure variáveis de ambiente corretas

---

## 🆘 Problemas Comuns

### Backend não responde
- Verifique logs no Render Dashboard
- Confirme DATABASE_URL correta
- Teste: `curl https://sua-api.onrender.com/api/health`

### Frontend com erro de CORS
- Verifique FRONTEND_URL no backend
- Verifique VITE_API_URL no frontend
- Ambas devem usar HTTPS

### Build falha
- Confirme Root Directory correto
- Verifique package.json
- Cheque logs de build

---

## 📊 Monitoramento

### Render
- Dashboard → Logs (tempo real)
- Dashboard → Metrics (CPU/RAM)

### Vercel
- Dashboard → Analytics
- Dashboard → Logs

---

## 💰 Custos Estimados

### Grátis (Para Testes)
- Render PostgreSQL: Free
- Render Web Service: Free (hiberna)
- Vercel: Free

### Produção Recomendada (~$15/mês)
- Render PostgreSQL: $7/mês
- Render Web Service: $7/mês
- Vercel Pro: $20/mês (opcional)

---

Desenvolvido por **Marcio Gil** 🚀
