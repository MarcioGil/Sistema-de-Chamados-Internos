# 🚀 Guia Completo de Deploy - HelpDeskFlow

Deploy do **Backend no Render** e **Frontend no Vercel**

---

## 📋 Informações Importantes

### JWT_SECRET (já gerado)
```
38efbc86b87fd3bada62151fe097f14e6c897e0f56bd37ba923b849ba9e40a8a990938b332943f91c9eb2406382fb0b3908203395c8c5aea8e4458e752f22435a
```

### Repositório GitHub
```
https://github.com/MarcioGil/HelpDeskFlow
```

---

## 🗄️ PASSO 1: Deploy do Banco de Dados (Render PostgreSQL)

### 1.1. Criar Database no Render

1. Acesse: https://dashboard.render.com/
2. Clique em **"New +"** → **"PostgreSQL"**
3. Preencha:
   - **Name**: `helpdeskflow-db`
   - **Database**: `helpdeskflow`
   - **User**: `helpdeskflow_user`
   - **Region**: `Oregon (US West)` ou mais próximo
   - **PostgreSQL Version**: `15` (ou mais recente)
   - **Plan**: **Free** (ou pago se preferir)

4. Clique em **"Create Database"**
5. **Aguarde 2-3 minutos** para o banco ser criado

### 1.2. Copiar Connection String

Após criado, na página do database:

1. Localize a seção **"Connections"**
2. Copie o **"Internal Database URL"**
   - Formato: `postgresql://helpdeskflow_user:SENHA@HOST/helpdeskflow`
3. **Guarde essa URL**, você vai usar no backend!

---

## 🔧 PASSO 2: Deploy do Backend (Render Web Service)

### 2.1. Criar Web Service

1. No Render Dashboard, clique em **"New +"** → **"Web Service"**
2. Clique em **"Connect a repository"**
3. Escolha: **`MarcioGil/HelpDeskFlow`**
4. Configure:
   - **Name**: `helpdeskflow-api`
   - **Region**: Mesma do banco de dados (Oregon US West)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: **Node**
   - **Plan**: **Free** (ou pago)

### 2.2. Comandos de Build e Start

- **Build Command**:
  ```bash
  npm install && npx prisma generate && npm run build
  ```

- **Start Command**:
  ```bash
  npx prisma migrate deploy && npm start
  ```

### 2.3. Environment Variables (Variáveis de Ambiente)

Clique em **"Advanced"** e adicione as seguintes variáveis:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `3333` |
| `DATABASE_URL` | [Cole a Internal Database URL copiada do PostgreSQL] |
| `JWT_SECRET` | `38efbc86b87fd3bada62151fe097f14e6c897e0f56bd37ba923b849ba9e40a8a990938b332943f91c9eb2406382fb0b3908203395c8c5aea8e4458e752f22435a` |
| `FRONTEND_URL` | `https://helpdeskflow.vercel.app` (vamos atualizar depois) |

### 2.4. Criar o Serviço

1. Clique em **"Create Web Service"**
2. **Aguarde 5-10 minutos** para o build e deploy
3. Acompanhe os logs na aba **"Logs"**

### 2.5. Verificar Deploy

Após o deploy:

1. Copie a **URL do serviço** (ex: `https://helpdeskflow-api.onrender.com`)
2. Teste o health check:
   ```
   https://helpdeskflow-api.onrender.com/api/health
   ```
3. Deve retornar: `{ "status": "ok", "timestamp": "..." }`

### 2.6. Popular Banco de Dados (Seed)

1. No Render, abra a página do **Web Service** (backend)
2. Clique na aba **"Shell"**
3. Execute o comando:
   ```bash
   npm run prisma:seed
   ```
4. Aguarde a mensagem de sucesso com os usuários criados

**Usuários de teste criados:**
- `admin@helpdeskflow.com` / `Admin@123` (ADMIN)
- `joao.silva@helpdeskflow.com` / `Atendente@123` (ATTENDANT)
- `maria.santos@helpdeskflow.com` / `Atendente@123` (ATTENDANT)
- `carlos.oliveira@helpdeskflow.com` / `Usuario@123` (USER)
- `ana.paula@helpdeskflow.com` / `Usuario@123` (USER)

---

## 🎨 PASSO 3: Deploy do Frontend (Vercel)

### 3.1. Criar Projeto na Vercel

1. Acesse: https://vercel.com/dashboard
2. Clique em **"Add New..."** → **"Project"**
3. Clique em **"Import Git Repository"**
4. Escolha: **`MarcioGil/HelpDeskFlow`**
5. Clique em **"Import"**

### 3.2. Configurar Projeto

- **Framework Preset**: **Vite**
- **Root Directory**: `frontend` (clique em **Edit** e selecione)
- **Build Command**: `npm run build` (já detectado automaticamente)
- **Output Directory**: `dist` (já detectado)
- **Install Command**: `npm install` (já detectado)

### 3.3. Environment Variables

Clique em **"Environment Variables"** e adicione:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://helpdeskflow-api.onrender.com/api` (substitua pela URL do seu backend) |

### 3.4. Deploy

1. Clique em **"Deploy"**
2. **Aguarde 2-3 minutos** para o build
3. Acompanhe o progresso na tela

### 3.5. Obter URL do Frontend

Após o deploy:

1. Copie a **URL do projeto** (ex: `https://helpdeskflow.vercel.app`)
2. **Guarde essa URL!**

---

## 🔄 PASSO 4: Atualizar CORS no Backend

Agora que você tem a URL do frontend, precisa atualizar o backend:

1. Volte para o **Render Dashboard**
2. Abra o **Web Service do backend** (`helpdeskflow-api`)
3. Vá em **"Environment"**
4. Edite a variável `FRONTEND_URL`:
   - **Valor anterior**: `https://helpdeskflow.vercel.app`
   - **Valor novo**: [Cole a URL real da Vercel, ex: `https://helpdeskflow-abc123.vercel.app`]
5. Clique em **"Save Changes"**
6. O Render vai fazer **redeploy automático** (aguarde 2-3 minutos)

---

## ✅ PASSO 5: Testar Aplicação em Produção

### 5.1. Acesse o Frontend

1. Abra a URL da Vercel no navegador
2. Você deve ver a tela de login

### 5.2. Teste de Login

1. Use um dos usuários criados:
   - **Admin**: `admin@helpdeskflow.com` / `Admin@123`
   - **Atendente**: `joao.silva@helpdeskflow.com` / `Atendente@123`
   - **Usuário**: `carlos.oliveira@helpdeskflow.com` / `Usuario@123`

2. Teste as funcionalidades:
   - ✅ Login
   - ✅ Dashboard (métricas carregando)
   - ✅ Lista de tickets
   - ✅ Criar novo ticket
   - ✅ Ver detalhes do ticket
   - ✅ Adicionar comentário
   - ✅ Atualizar status (para Atendente/Admin)
   - ✅ Navegação por teclado (Tab)
   - ✅ Logout

### 5.3. Testar Acessibilidade

1. Navegue com **Tab** e **Shift+Tab**
2. Use **Enter** para clicar em botões
3. Teste com leitor de tela (NVDA/JAWS)

---

## 📝 PASSO 6: Documentação Final

### 6.1. Atualizar README.md

Adicione a seção **Demo** no README.md:

```markdown
## 🌐 Demo

Aplicação em produção:
- **Frontend**: https://[SUA-URL].vercel.app
- **Backend API**: https://[SUA-URL].onrender.com/api

### Usuários de Teste
- **Admin**: admin@helpdeskflow.com / Admin@123
- **Atendente**: joao.silva@helpdeskflow.com / Atendente@123
- **Usuário**: carlos.oliveira@helpdeskflow.com / Usuario@123
```

### 6.2. Commit e Push

```bash
git add README.md
git commit -m "docs: Adiciona URLs de produção no README"
git push origin main
```

---

## 🎉 PASSO 7: Compartilhar Projeto

### 7.1. Post no LinkedIn

Exemplo de post:

```
🎫 HelpDeskFlow - Sistema de Chamadas Internas

Acabei de lançar meu novo projeto full-stack!

🚀 Tecnologias:
- Backend: Node.js + Express + TypeScript
- Frontend: React + TypeScript + Vite
- Banco: PostgreSQL + Prisma ORM
- Deploy: Render + Vercel

🔐 Segurança Enterprise:
- Autenticação JWT
- Rate Limiting
- Proteção XSS/SQL Injection
- Sanitização de inputs
- CORS configurado

♿ Acessibilidade WCAG 2.1 Level AA:
- Navegação por teclado
- Suporte a leitores de tela
- Alto contraste
- ARIA labels completos

📊 Funcionalidades:
- Dashboard com métricas em tempo real
- Gestão completa de tickets
- Sistema de comentários
- Histórico de mudanças
- Filtros avançados
- Notificações

🔗 Demo: https://[SUA-URL].vercel.app
💻 GitHub: https://github.com/MarcioGil/HelpDeskFlow

#FullStack #TypeScript #React #NodeJS #Acessibilidade #WebDevelopment #DIOCampusExpert
```

### 7.2. Adicionar ao Portfolio

Adicione ao seu portfólio em `marciogil.github.io/curriculum-vitae/`:

```markdown
### HelpDeskFlow - Sistema de Chamadas Internas
**2024 | Full-Stack TypeScript**

Sistema completo de gestão de tickets com segurança enterprise e acessibilidade WCAG 2.1 AA.

**Tecnologias**: React, Node.js, Express, PostgreSQL, Prisma, TypeScript  
**Deploy**: Vercel + Render  
**Links**: [Demo](https://[SUA-URL].vercel.app) | [GitHub](https://github.com/MarcioGil/HelpDeskFlow)
```

---

## 🔍 Troubleshooting

### Backend não conecta ao banco

1. Verifique se a `DATABASE_URL` está correta
2. Confirme que o PostgreSQL está rodando (verde no Render)
3. Teste a conexão no Shell do Render: `npx prisma db push`

### Frontend não conecta ao backend

1. Verifique `VITE_API_URL` na Vercel
2. Confirme que `FRONTEND_URL` está correto no Render
3. Teste a API manualmente: `curl https://[backend-url]/api/health`

### Erro CORS

1. Confirme que `FRONTEND_URL` no backend é exatamente a URL da Vercel
2. Inclua `https://` na URL
3. Não coloque `/` no final da URL

### Migrations não rodam

1. No Shell do Render: `npx prisma migrate deploy`
2. Se falhar: `npx prisma db push --accept-data-loss`
3. Popular novamente: `npm run prisma:seed`

### Build falha na Vercel

1. Verifique logs de erro na Vercel
2. Confirme que `frontend/` está selecionado como Root Directory
3. Teste build localmente: `npm run build` na pasta frontend

---

## 📊 Monitoramento

### Render
- **Logs**: Dashboard → Web Service → Logs
- **Métricas**: Dashboard → Web Service → Metrics
- **Alertas**: Configure email notifications

### Vercel
- **Analytics**: Dashboard → Project → Analytics
- **Logs**: Dashboard → Project → Deployments → [deployment] → View Function Logs
- **Domains**: Configure domínio customizado em Settings → Domains

---

## 🎯 Próximas Melhorias

- [ ] Configurar domínio customizado
- [ ] Adicionar CI/CD com GitHub Actions
- [ ] Implementar testes automatizados
- [ ] Configurar monitoring (Sentry)
- [ ] Adicionar logs estruturados
- [ ] Implementar cache (Redis)
- [ ] Adicionar rate limiting avançado
- [ ] Implementar uploads de arquivos (S3)

---

## 📞 Suporte

- **Documentação**: README.md, DEPLOY_CHECKLIST.md
- **Issues**: https://github.com/MarcioGil/HelpDeskFlow/issues
- **LinkedIn**: [Marcio Gil](https://www.linkedin.com/in/marcio-gil)

---

**Criado por**: Marcio Gil  
**DIO Campus Expert**: Turma 14  
**GitHub**: https://github.com/MarcioGil  
**Portfólio**: https://marciogil.github.io/curriculum-vitae/
