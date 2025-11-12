# 🚀 Checklist Rápido de Deploy

Use este checklist para fazer o deploy passo a passo.

---

## ✅ PRÉ-REQUISITOS

- [ ] Código commitado no GitHub: `https://github.com/MarcioGil/HelpDeskFlow`
- [ ] Conta criada no Render: `https://dashboard.render.com/`
- [ ] Conta criada na Vercel: `https://vercel.com/dashboard`

---

## 🗄️ PASSO 1: BANCO DE DADOS (5 min)

1. [ ] Acessar Render Dashboard
2. [ ] New + → PostgreSQL
3. [ ] Preencher:
   - Name: `helpdeskflow-db`
   - Database: `helpdeskflow`
   - Region: `Oregon (US West)`
   - Plan: `Free`
4. [ ] Create Database
5. [ ] **COPIAR Internal Database URL** (guardar para o próximo passo)

---

## 🔧 PASSO 2: BACKEND (10 min)

1. [ ] New + → Web Service
2. [ ] Connect: `MarcioGil/HelpDeskFlow`
3. [ ] Configurar:
   - Name: `helpdeskflow-api`
   - Root Directory: `backend`
   - Build: `npm install && npx prisma generate && npm run build`
   - Start: `npx prisma migrate deploy && npm start`

4. [ ] **Environment Variables** (clicar em Advanced):

```env
NODE_ENV=production
PORT=3333
DATABASE_URL=[COLAR A URL DO POSTGRES AQUI]
JWT_SECRET=38efbc86b87fd3bada62151fe097f14e6c897e0f56bd37ba923b849ba9e40a8a990938b332943f91c9eb2406382fb0b3908203395c8c5aea8e4458e752f22435a
FRONTEND_URL=https://helpdeskflow.vercel.app
```

5. [ ] Create Web Service
6. [ ] **AGUARDAR BUILD** (5-10 min)
7. [ ] **COPIAR URL do backend** (ex: `https://helpdeskflow-api.onrender.com`)
8. [ ] Testar: `/api/health` (deve retornar `{"status":"ok"}`)
9. [ ] Abrir Shell → executar: `npm run prisma:seed`

---

## 🎨 PASSO 3: FRONTEND (5 min)

1. [ ] Acessar Vercel Dashboard
2. [ ] New Project → Import `MarcioGil/HelpDeskFlow`
3. [ ] Configurar:
   - Root Directory: `frontend` (clicar em Edit)
   - Framework: `Vite` (detectado automaticamente)

4. [ ] **Environment Variable**:

```
VITE_API_URL=https://helpdeskflow-api.onrender.com/api
```
   (substituir pela URL real do backend copiada no passo 2)

5. [ ] Deploy
6. [ ] **AGUARDAR BUILD** (2-3 min)
7. [ ] **COPIAR URL do frontend** (ex: `https://helpdeskflow-xyz.vercel.app`)

---

## 🔄 PASSO 4: ATUALIZAR CORS (2 min)

1. [ ] Voltar para Render Dashboard
2. [ ] Abrir Web Service (`helpdeskflow-api`)
3. [ ] Environment → Editar `FRONTEND_URL`
4. [ ] Colar URL real da Vercel (do passo 3)
5. [ ] Save Changes
6. [ ] **AGUARDAR REDEPLOY** (2-3 min)

---

## ✅ PASSO 5: TESTAR (5 min)

1. [ ] Abrir URL da Vercel
2. [ ] Fazer login com:
   - **Email**: `admin@helpdeskflow.com`
   - **Senha**: `Admin@123`

3. [ ] Testar funcionalidades:
   - [ ] Dashboard carrega
   - [ ] Criar ticket
   - [ ] Ver lista de tickets
   - [ ] Adicionar comentário
   - [ ] Atualizar status
   - [ ] Logout

4. [ ] Testar acessibilidade:
   - [ ] Navegação com Tab
   - [ ] Todos os elementos focáveis
   - [ ] Nenhum erro no console

---

## 📝 PASSO 6: DOCUMENTAR (3 min)

1. [ ] Anotar URLs finais:
   - Frontend: `___________________________________`
   - Backend: `___________________________________`

2. [ ] Atualizar README.md com seção Demo
3. [ ] Commit e push:

```bash
git add README.md
git commit -m "docs: Add production URLs"
git push origin main
```

---

## 🎉 PASSO 7: COMPARTILHAR

1. [ ] Criar post no LinkedIn (modelo em DEPLOY_GUIDE.md)
2. [ ] Adicionar ao portfolio
3. [ ] Compartilhar no GitHub

---

## ⏱️ TEMPO TOTAL ESTIMADO: ~30 minutos

- Banco de dados: 5 min
- Backend: 10 min
- Frontend: 5 min
- Atualização CORS: 2 min
- Testes: 5 min
- Documentação: 3 min

---

## 🆘 PROBLEMAS COMUNS

### Backend não inicia
- Verificar DATABASE_URL está correto
- Verificar logs no Render
- Rodar migrations manualmente no Shell

### Frontend não conecta
- Verificar VITE_API_URL na Vercel
- Verificar FRONTEND_URL no Render
- Testar API diretamente no navegador

### Erro CORS
- FRONTEND_URL deve ser exatamente a URL da Vercel
- Incluir `https://` mas SEM `/` no final
- Aguardar redeploy após alterar

---

## 📚 GUIA COMPLETO

Para instruções detalhadas, consulte: **DEPLOY_GUIDE.md**

---

**Bom deploy! 🚀**
