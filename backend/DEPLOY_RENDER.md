# HelpDeskFlow - Deploy no Render

Este guia mostra como fazer deploy do backend no Render.

## Pré-requisitos

- Conta no [Render](https://render.com)
- Conta no GitHub com o repositório
- PostgreSQL (pode usar o Render PostgreSQL Database)

## Passo 1: Criar Banco de Dados

1. Acesse [render.com/dashboard](https://dashboard.render.com/)
2. Clique em **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: helpdeskflow-db
   - **Database**: helpdeskflow
   - **User**: helpdeskflow_user
   - **Region**: escolha o mais próximo
   - **Plan**: Free (para testes)
4. Clique em **"Create Database"**
5. Copie a **Internal Database URL** (formato: `postgresql://...`)

## Passo 2: Deploy do Backend

1. No dashboard do Render, clique em **"New +"** → **"Web Service"**
2. Conecte ao repositório do GitHub: `MarcioGil/HelpDeskFlow`
3. Configure:

```yaml
Name: helpdeskflow-api
Region: Same as database
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install && npx prisma generate && npm run build
Start Command: npx prisma migrate deploy && npm start
```

4. Adicione as **Environment Variables**:

```env
NODE_ENV=production
PORT=3333
DATABASE_URL=[Cole a Internal Database URL do Passo 1]
JWT_SECRET=[Gere uma chave segura - veja abaixo]
FRONTEND_URL=https://helpdeskflow.vercel.app
```

**Gerar JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

5. Escolha o plano **Free**
6. Clique em **"Create Web Service"**

## Passo 3: Verificar Deploy

1. Aguarde o build completar (5-10 minutos)
2. Acesse a URL gerada (ex: `https://helpdeskflow-api.onrender.com`)
3. Teste: `https://helpdeskflow-api.onrender.com/api/health`

## Passo 4: Popular o Banco (Seed)

Após o primeiro deploy, você pode rodar o seed manualmente:

1. No dashboard do Render, vá em **"Shell"**
2. Execute: `npm run prisma:seed`

## Troubleshooting

### Erro de Build
- Verifique se o `Root Directory` está como `backend`
- Confirme que todas as dependências estão no `package.json`

### Erro de Database Connection
- Confirme que a `DATABASE_URL` está correta
- Use a **Internal Database URL** (não a External)

### Erro 502 Bad Gateway
- Verifique se o `Start Command` está correto
- Cheque os logs em **"Logs"** no dashboard

## URLs de Exemplo

- API: `https://helpdeskflow-api.onrender.com/api`
- Health: `https://helpdeskflow-api.onrender.com/api/health`
- Login: `POST https://helpdeskflow-api.onrender.com/api/auth/login`

## Nota Importante

⚠️ O plano Free do Render **hiberna após 15 minutos de inatividade**. O primeiro acesso pode levar até 30 segundos para "acordar" o serviço.

Para manter sempre ativo, considere:
- Upgrade para plano pago ($7/mês)
- Usar um serviço de ping (ex: UptimeRobot)
