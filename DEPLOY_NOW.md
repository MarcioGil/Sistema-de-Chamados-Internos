# 🚀 INSTRUÇÕES DE DEPLOY - SIGA AGORA

Código enviado para o GitHub com sucesso! ✅

Agora você precisa fazer o deploy em **2 plataformas**:

---

## 📋 O QUE VOCÊ VAI FAZER

### 1️⃣ **RENDER** (Backend + Banco de Dados)
   - Criar PostgreSQL
   - Criar Web Service (API)
   - Popular banco de dados

### 2️⃣ **VERCEL** (Frontend)
   - Importar projeto
   - Configurar variável de ambiente
   - Deploy automático

### 3️⃣ **ATUALIZAR CORS**
   - Conectar frontend e backend

**⏱️ Tempo total**: ~20-30 minutos

---

## 🗄️ PASSO 1: CRIAR BANCO DE DADOS (5 min)

### 1.1. Acesse o Render
👉 **Abra**: https://dashboard.render.com/
- Se não tem conta, crie uma (grátis, usar GitHub)

### 1.2. Crie o PostgreSQL
1. Clique em **"New +"** (canto superior direito)
2. Escolha **"PostgreSQL"**
3. Preencha:
   ```
   Name: helpdeskflow-db
   Database: helpdeskflow
   User: helpdeskflow_user
   Region: Oregon (US West) ou mais próximo
   Plan: Free
   ```
4. Clique em **"Create Database"**
5. **AGUARDE 2-3 MINUTOS** para criar

### 1.3. Copie a Connection String
1. Na página do banco, vá em **"Info"** ou **"Connect"**
2. Localize **"Internal Database URL"**
3. **COPIE ESSA URL** (você vai usar no próximo passo)
   - Exemplo: `postgresql://helpdeskflow_user:SENHA@HOST/helpdeskflow`

📝 **Cole aqui para não perder**:
```
[Cole a DATABASE_URL aqui]
```

---

## 🔧 PASSO 2: CRIAR BACKEND (10 min)

### 2.1. Criar Web Service
1. No Render, clique em **"New +"** → **"Web Service"**
2. Clique em **"Connect a repository"** (conecte seu GitHub se não fez)
3. Localize e escolha: **`MarcioGil/HelpDeskFlow`**
4. Clique em **"Connect"**

### 2.2. Configurar o Serviço
Preencha:
```
Name: helpdeskflow-api
Region: Oregon (US West) - MESMA DO BANCO
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install && npx prisma generate && npm run build
Start Command: npx prisma migrate deploy && npm start
Plan: Free
```

### 2.3. Configurar Variáveis de Ambiente
1. Role para baixo até **"Environment Variables"**
2. Clique em **"Add Environment Variable"**
3. Adicione estas 5 variáveis:

**Variável 1:**
```
Key: NODE_ENV
Value: production
```

**Variável 2:**
```
Key: PORT
Value: 3333
```

**Variável 3:**
```
Key: DATABASE_URL
Value: [COLE AQUI A URL QUE VOCÊ COPIOU DO POSTGRESQL]
```

**Variável 4:**
```
Key: JWT_SECRET
Value: 38efbc86b87fd3bada62151fe097f14e6c897e0f56bd37ba923b849ba9e40a8a990938b332943f91c9eb2406382fb0b3908203395c8c5aea8e4458e752f22435a
```

**Variável 5:**
```
Key: FRONTEND_URL
Value: https://helpdeskflow.vercel.app
```
⚠️ *Vamos atualizar essa URL depois com a URL real da Vercel*

### 2.4. Criar o Serviço
1. Clique em **"Create Web Service"** (no final da página)
2. **AGUARDE 5-10 MINUTOS** para o build
3. Acompanhe o progresso na aba **"Logs"**
4. Quando aparecer "Your service is live 🎉", continue

### 2.5. Copie a URL do Backend
1. Na página do serviço, copie a **URL** (ex: `https://helpdeskflow-api.onrender.com`)
2. **Teste** abrindo no navegador: `[SUA-URL]/api/health`
   - Deve retornar: `{"status":"ok",...}`

📝 **Cole aqui a URL do backend**:
```
[Cole a URL do backend aqui]
```

### 2.6. Popular o Banco de Dados
1. Na página do **Web Service**, clique na aba **"Shell"**
2. Aguarde o terminal abrir
3. Execute o comando:
   ```bash
   npm run prisma:seed
   ```
4. Aguarde aparecer a mensagem de sucesso com os usuários criados ✅

---

## 🎨 PASSO 3: CRIAR FRONTEND (5 min)

### 3.1. Acesse a Vercel
👉 **Abra**: https://vercel.com/dashboard
- Se não tem conta, crie uma (grátis, usar GitHub)

### 3.2. Importar Projeto
1. Clique em **"Add New..."** → **"Project"**
2. Clique em **"Import Git Repository"**
3. Localize: **`MarcioGil/HelpDeskFlow`**
4. Clique em **"Import"**

### 3.3. Configurar Deploy

⚠️ **IMPORTANTE**: Você precisa configurar o Root Directory!

1. Em **"Configure Project"**, procure a seção **"Root Directory"**:
   - Clique no botão **"Edit"** (ao lado de Root Directory)
   - Selecione a pasta **`frontend`**
   - Clique em **"Continue"**

2. Verifique as configurações:
   ```
   Framework Preset: Vite (detectado automaticamente)
   Root Directory: frontend ✓
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. Em **"Environment Variables"**, adicione:
   ```
   Name: VITE_API_URL
   Value: [SUA-URL-DO-BACKEND]/api
   ```
   Exemplo: `https://helpdeskflow-api.onrender.com/api`
   ⚠️ **NÃO ESQUEÇA DO `/api` NO FINAL**

### 3.4. Deploy
1. Clique em **"Deploy"**
2. **AGUARDE 2-3 MINUTOS** para o build
3. Quando aparecer "Congratulations! 🎉", clique em **"Continue to Dashboard"**

### 3.5. Copie a URL do Frontend
1. Copie a **URL do projeto** (ex: `https://helpdeskflow-xyz.vercel.app`)

📝 **Cole aqui a URL do frontend**:
```
[Cole a URL do frontend aqui]
```

---

## 🔄 PASSO 4: ATUALIZAR CORS (2 min)

### 4.1. Voltar para o Render
1. Acesse: https://dashboard.render.com/
2. Abra o **Web Service** (`helpdeskflow-api`)
3. Clique na aba **"Environment"**

### 4.2. Atualizar FRONTEND_URL
1. Localize a variável `FRONTEND_URL`
2. Clique no **ícone de editar** (lápis)
3. **SUBSTITUA** o valor por:
   ```
   [COLE A URL REAL DA VERCEL]
   ```
   Exemplo: `https://helpdeskflow-xyz.vercel.app`
   ⚠️ **SEM `/` NO FINAL**

4. Clique em **"Save Changes"**
5. O Render vai fazer **redeploy automático** (aguarde 2-3 min)

---

## ✅ PASSO 5: TESTAR APLICAÇÃO (5 min)

### 5.1. Acessar o Frontend
1. Abra a **URL da Vercel** no navegador
2. Você deve ver a tela de login

### 5.2. Fazer Login
Use um dos usuários de teste:
```
👨‍💼 Admin
Email: admin@helpdeskflow.com
Senha: Admin@123

🎧 Atendente
Email: joao.silva@helpdeskflow.com
Senha: Atendente@123

👤 Usuário
Email: carlos.oliveira@helpdeskflow.com
Senha: Usuario@123
```

### 5.3. Testar Funcionalidades
✅ Dashboard carrega com métricas  
✅ Criar novo ticket  
✅ Ver lista de tickets  
✅ Adicionar comentário  
✅ Atualizar status (Atendente/Admin)  
✅ Navegação com Tab funciona  
✅ Logout funciona

---

## 🎉 CONCLUÍDO!

Se tudo funcionou, você tem:
- ✅ Backend rodando no Render
- ✅ Frontend rodando na Vercel
- ✅ Banco de dados PostgreSQL
- ✅ Aplicação totalmente funcional

---

## 📝 PRÓXIMO PASSO: DOCUMENTAR

Anote suas URLs e me avise que vou atualizar o README.md:

**Backend**: `____________________________________`
**Frontend**: `____________________________________`

---

## 🆘 PROBLEMAS?

### Backend não inicia
- Verifique os logs no Render (aba "Logs")
- Confirme que DATABASE_URL está correto
- Tente rodar migrations manualmente no Shell: `npx prisma migrate deploy`

### Frontend não conecta
- Verifique se VITE_API_URL está correto na Vercel
- Teste a API diretamente: `[backend-url]/api/health`
- Verifique FRONTEND_URL no Render

### Erro CORS
- FRONTEND_URL deve ser exatamente a URL da Vercel
- Incluir `https://` mas SEM `/` no final
- Aguardar redeploy após alterar

---

**ME AVISE QUANDO TERMINAR E PASSE AS URLS!** 🚀
