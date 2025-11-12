# 🚀 Deploy pelo Terminal - Render

## Método Recomendado: Blueprint (render.yaml)

Você já tem o arquivo `render.yaml` configurado! Isso facilita muito o deploy.

---

## 📋 Passo a Passo

### 1️⃣ Acesse o Render Dashboard

Abra no navegador: https://dashboard.render.com/

- Faça login (use GitHub se ainda não tem conta)

---

### 2️⃣ Conecte o Repositório GitHub

1. No Render Dashboard, clique em **"New +"** (canto superior direito)
2. Escolha **"Blueprint"**
3. Clique em **"Connect a repository"**
4. Autorize o acesso ao GitHub (se solicitado)
5. Selecione o repositório: **`MarcioGil/Sistema-de-Chamados-Internos`**
6. Clique em **"Connect"**

---

### 3️⃣ Render Detecta o Blueprint Automaticamente

O Render vai **detectar automaticamente** o arquivo `render.yaml` e mostrar:

```
✅ helpdeskflow-db (PostgreSQL Database)
✅ helpdeskflow-api (Web Service)
```

---

### 4️⃣ Configure Apenas uma Variável

⚠️ **IMPORTANTE**: Você precisa configurar **DATABASE_URL** manualmente:

**Opção A: Usar Neon.tech (Recomendado - Mais Rápido)**

1. Acesse: https://console.neon.tech/
2. Crie um projeto (se não tem): **"helpdeskflow"**
3. Copie a **Connection String**:
   ```
   postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/helpdeskflow?sslmode=require
   ```
4. No Render Blueprint, cole essa URL no campo `DATABASE_URL`

**Opção B: Usar PostgreSQL do Render (Grátis)**

1. O Render vai criar automaticamente o banco `helpdeskflow-db`
2. Ele vai conectar automaticamente ao backend
3. **Nenhuma ação necessária!** ✅

---

### 5️⃣ Clique em "Apply"

1. Revise as configurações
2. Clique em **"Apply"**
3. O Render vai criar:
   - ✅ Banco de dados PostgreSQL
   - ✅ Backend API
   - ✅ Rodar migrations automaticamente
   - ✅ Popular banco com dados iniciais

⏱️ **Tempo de deploy**: 5-10 minutos

---

### 6️⃣ Monitore o Deploy

Você verá 2 serviços sendo criados:

1. **helpdeskflow-db** (Database)
   - Status: Creating → Available
   
2. **helpdeskflow-api** (Web Service)
   - Status: Building → Deploying → Live

📊 Clique em **"helpdeskflow-api"** para ver os logs em tempo real.

---

### 7️⃣ Copie a URL do Backend

Após o deploy concluir:

1. Clique em **"helpdeskflow-api"**
2. Copie a **URL** no topo da página:
   ```
   https://helpdeskflow-api.onrender.com
   ```

3. **Teste o endpoint de saúde**:
   ```
   https://helpdeskflow-api.onrender.com/api/health
   ```
   
   Deve retornar:
   ```json
   { "status": "ok" }
   ```

---

## ⚙️ Variáveis de Ambiente (Já Configuradas no render.yaml)

O arquivo `render.yaml` já tem tudo configurado:

```yaml
✅ NODE_ENV=production
✅ PORT=3333
✅ DATABASE_URL (conecta automaticamente ao DB)
✅ JWT_SECRET (gerado automaticamente)
✅ FRONTEND_URL=https://helpdeskflow.vercel.app
```

**Você não precisa fazer nada!** 🎉

---

## 🔄 Atualizações Futuras

Após o deploy inicial, **qualquer push no GitHub** vai disparar um novo deploy automaticamente!

```bash
git add .
git commit -m "feat: nova funcionalidade"
git push origin main
```

O Render vai detectar e fazer o redeploy automaticamente! ✅

---

## 🚨 Problemas Comuns

### Erro: "DATABASE_URL não encontrado"

**Solução**: No dashboard do Render:
1. Vá em **"helpdeskflow-api"** → **"Environment"**
2. Verifique se `DATABASE_URL` está preenchida
3. Se não estiver, adicione manualmente a connection string do Neon.tech

---

### Erro: "Prisma Client não gerado"

**Solução**: Já está resolvido no `render.yaml`:
```yaml
buildCommand: npm install && npx prisma generate && npm run build
```

---

### Erro: "Port already in use"

**Solução**: Já está configurado no código para usar a porta do Render:
```typescript
const PORT = process.env.PORT || 3333
```

---

## ✅ Próximos Passos

Após o backend no ar:

1. **Atualizar Frontend (Vercel)**:
   - Acesse: https://vercel.com/dashboard
   - Vá em **"helpdeskflow"** → **"Settings"** → **"Environment Variables"**
   - Atualize `VITE_API_URL` com a URL do Render:
     ```
     https://helpdeskflow-api.onrender.com/api
     ```
   - Redeploy o frontend

2. **Testar Login**:
   - Acesse: https://helpdeskflow.vercel.app
   - Login:
     ```
     Email: admin@helpdesk.com
     Senha: admin123
     ```

3. **Criar seu primeiro ticket!** 🎫

---

## 📚 Recursos

- 📖 [Documentação Render Blueprint](https://render.com/docs/infrastructure-as-code)
- 📖 [Guia Completo - DEPLOY_NOW.md](./DEPLOY_NOW.md)
- 📖 [Troubleshooting - DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md)

---

## 🎉 Resumo

1. ✅ Abra https://dashboard.render.com/
2. ✅ New + → Blueprint
3. ✅ Conecte repositório GitHub
4. ✅ Render detecta `render.yaml` automaticamente
5. ✅ Clique em "Apply"
6. ✅ Aguarde 5-10 minutos
7. ✅ Copie a URL e teste!

**Simples assim!** 🚀
