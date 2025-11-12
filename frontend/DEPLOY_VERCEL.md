# HelpDeskFlow - Deploy no Vercel

Este guia mostra como fazer deploy do frontend no Vercel.

## Pré-requisitos

- Conta no [Vercel](https://vercel.com)
- Backend já deployado (Render/Railway)
- Repositório no GitHub

## Passo 1: Preparar o Frontend

Certifique-se de que o arquivo `frontend/.env.example` tem:

```env
VITE_API_URL=https://sua-api.onrender.com/api
```

## Passo 2: Deploy no Vercel

### Opção 1: Via Dashboard (Recomendado)

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique em **"Add New"** → **"Project"**
3. Importe o repositório: `MarcioGil/HelpDeskFlow`
4. Configure:

```yaml
Project Name: helpdeskflow
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

5. Adicione as **Environment Variables**:

```env
VITE_API_URL=https://helpdeskflow-api.onrender.com/api
```

⚠️ **Importante**: Substitua pela URL real da sua API do Render!

6. Clique em **"Deploy"**

### Opção 2: Via Vercel CLI

```bash
# Instale o Vercel CLI
npm install -g vercel

# No diretório frontend
cd frontend

# Login
vercel login

# Deploy
vercel --prod

# Quando perguntado:
# - Set up and deploy? Yes
# - Which scope? [sua conta]
# - Link to existing project? No
# - Project name? helpdeskflow
# - In which directory? ./
# - Override settings? Yes
#   - Build Command: npm run build
#   - Output Directory: dist
#   - Development Command: npm run dev
```

Depois, adicione a variável de ambiente:

```bash
vercel env add VITE_API_URL production
# Cole: https://helpdeskflow-api.onrender.com/api
```

E redeploy:

```bash
vercel --prod
```

## Passo 3: Verificar Deploy

1. Aguarde o build completar (2-5 minutos)
2. Acesse a URL gerada (ex: `https://helpdeskflow.vercel.app`)
3. Faça login com um dos usuários de teste

## Passo 4: Configurar Domínio Customizado (Opcional)

1. No dashboard do Vercel, vá em **"Settings"** → **"Domains"**
2. Adicione seu domínio
3. Configure o DNS conforme instruções

## Passo 5: Atualizar CORS no Backend

No Render, adicione a URL do Vercel nas variáveis de ambiente:

```env
FRONTEND_URL=https://helpdeskflow.vercel.app
```

Ou, se tiver domínio customizado:

```env
FRONTEND_URL=https://seudominio.com
```

## URLs de Exemplo

- Frontend: `https://helpdeskflow.vercel.app`
- Backend: `https://helpdeskflow-api.onrender.com/api`

## Troubleshooting

### Erro 404 ao Recarregar Página

Se ao recarregar uma página (ex: `/tickets/123`) você recebe 404, adicione o arquivo `vercel.json` na raiz do frontend:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Commit e redeploy.

### Erro de CORS

Certifique-se de que:
1. A variável `FRONTEND_URL` no backend está correta
2. A variável `VITE_API_URL` no frontend está correta
3. Ambas as URLs são HTTPS

### Build Falha

- Verifique se o `Root Directory` está como `frontend`
- Confirme que todas as dependências estão no `package.json`
- Cheque os logs de build no dashboard

## Deploy Automático

O Vercel faz deploy automático a cada push na branch `main`. Para desabilitar:

1. **Settings** → **Git**
2. Desmarque **"Automatically deploy commits pushed to Production Branch"**

## Preview Deploys

Cada Pull Request gera um deploy de preview automático. Acesse pelo comentário do bot no PR.

## Analytics (Opcional)

O Vercel oferece analytics gratuito:

1. **Settings** → **Analytics**
2. Ative o **Vercel Analytics**
3. Adicione o snippet no `main.tsx`:

```tsx
import { inject } from '@vercel/analytics';

inject();
```

## Performance

O frontend no Vercel já vem otimizado com:
- ✅ CDN global
- ✅ Cache automático
- ✅ Compression (Gzip/Brotli)
- ✅ HTTP/2
- ✅ Edge Network

## Custos

- **Hobby Plan** (Free):
  - 100GB bandwidth/mês
  - Deploy ilimitado
  - Deploy de preview ilimitado
  - Domínios customizados

- **Pro Plan** ($20/mês):
  - 1TB bandwidth/mês
  - Mais analytics
  - Mais performance

---

## Nota sobre Ambientes

Para ter ambientes separados (staging/production):

```bash
# Staging
vercel

# Production
vercel --prod
```

Configure variáveis diferentes para cada ambiente no dashboard.
