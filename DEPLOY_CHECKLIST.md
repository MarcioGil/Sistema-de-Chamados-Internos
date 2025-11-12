# ✅ Checklist de Deploy - HelpDeskFlow

Use este checklist para garantir que todos os passos foram seguidos antes do deploy.

---

## 📋 Pré-Deploy

### Repositório
- [x] Código commitado no GitHub
- [x] README.md atualizado
- [x] .gitignore configurado
- [x] LICENSE adicionada (MIT)
- [ ] Tags de versão criadas

### Variáveis de Ambiente
- [ ] `.env` do backend **NÃO** commitado
- [ ] `.env` do frontend **NÃO** commitado
- [ ] `.env.example` criado e commitado
- [ ] JWT_SECRET gerado (64 bytes)
- [ ] DATABASE_URL preparada

### Testes Locais
- [ ] Backend rodando sem erros
- [ ] Frontend rodando sem erros
- [ ] Conexão backend-frontend funcionando
- [ ] Banco de dados populado (seed)
- [ ] Login funcionando
- [ ] CRUD de tickets funcionando
- [ ] Dashboard carregando
- [ ] Acessibilidade testada

---

## 🗄️ Banco de Dados (Render PostgreSQL)

### Criar Database
- [ ] Acessar [Render Dashboard](https://dashboard.render.com/)
- [ ] New + → PostgreSQL
- [ ] Nome: `helpdeskflow-db`
- [ ] Database: `helpdeskflow`
- [ ] User: `helpdeskflow_user`
- [ ] Region: escolhida
- [ ] Plan: Free (ou pago)
- [ ] Database criado

### Configuração
- [ ] Internal Database URL copiada
- [ ] External Database URL anotada (se necessário)
- [ ] Testar conexão localmente

---

## 🔧 Backend (Render Web Service)

### Criar Serviço
- [ ] New + → Web Service
- [ ] Conectado ao GitHub: `MarcioGil/HelpDeskFlow`
- [ ] Root Directory: `backend`
- [ ] Branch: `main`
- [ ] Runtime: Node
- [ ] Plan: Free (ou pago)

### Comandos
- [ ] Build Command: `npm install && npx prisma generate && npm run build`
- [ ] Start Command: `npx prisma migrate deploy && npm start`

### Environment Variables
```env
- [ ] NODE_ENV=production
- [ ] PORT=3333
- [ ] DATABASE_URL=[Internal Database URL]
- [ ] JWT_SECRET=[64 bytes hex]
- [ ] FRONTEND_URL=https://helpdeskflow.vercel.app
```

### Verificação
- [ ] Build passou sem erros
- [ ] Serviço está rodando (verde)
- [ ] Health check: `https://[sua-api].onrender.com/api/health`
- [ ] Logs sem erros críticos

### Popular Banco (Seed)
- [ ] Acessar Shell no Render
- [ ] Executar: `npm run prisma:seed`
- [ ] Verificar usuários criados

---

## 🎨 Frontend (Vercel)

### Criar Projeto
- [ ] Acessar [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] New Project
- [ ] Import: `MarcioGil/HelpDeskFlow`
- [ ] Root Directory: `frontend`
- [ ] Framework: Vite
- [ ] Plan: Hobby (Free)

### Configuração de Build
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `npm install`

### Environment Variables
```env
- [ ] VITE_API_URL=https://[sua-api].onrender.com/api
```

### Verificação
- [ ] Build passou sem erros
- [ ] Deploy finalizado
- [ ] Site acessível: `https://[seu-app].vercel.app`
- [ ] Login funcionando
- [ ] Tickets carregando
- [ ] Dashboard exibindo
- [ ] Console sem erros

---

## 🔒 Segurança Pós-Deploy

### Backend
- [ ] HTTPS habilitado
- [ ] Rate limiting funcionando
- [ ] CORS configurado corretamente
- [ ] Helmet headers ativos
- [ ] Erros não vazando info sensível
- [ ] JWT expirando corretamente

### Frontend
- [ ] HTTPS habilitado
- [ ] API URL correta (HTTPS)
- [ ] Tokens armazenados com segurança
- [ ] Logout ao expirar token
- [ ] CSP headers configurados

### Ambos
- [ ] Variáveis sensíveis em ENV (não hardcoded)
- [ ] `.env` nunca commitados
- [ ] Secrets diferentes por ambiente

---

## ♿ Acessibilidade Pós-Deploy

### Testes
- [ ] Navegação por teclado (Tab) funciona
- [ ] Leitores de tela testados (NVDA/VoiceOver)
- [ ] Contraste de cores adequado
- [ ] Zoom até 200% funcional
- [ ] Focus indicators visíveis
- [ ] Skip links funcionam

### Ferramentas
- [ ] Lighthouse audit (>90 em Accessibility)
- [ ] WAVE extension (0 erros)
- [ ] axe DevTools (0 violations)

---

## 📊 Monitoramento

### Render
- [ ] Logs configurados
- [ ] Alertas de erro (email)
- [ ] Metrics habilitadas

### Vercel
- [ ] Analytics habilitado
- [ ] Error reporting ativo
- [ ] Deploy notifications configuradas

---

## 📝 Documentação Atualizada

### README
- [ ] URLs de produção adicionadas
- [ ] Badges atualizadas
- [ ] Screenshots/GIFs (opcional)
- [ ] Links funcionando

### Outros Docs
- [ ] DEPLOY.md com URLs reais
- [ ] SECURITY.md revisado
- [ ] CONTRIBUTING.md atualizado

---

## 🧪 Testes Pós-Deploy

### Funcionalidades Core
- [ ] Registro de novo usuário
- [ ] Login com credenciais corretas
- [ ] Login com credenciais incorretas (deve falhar)
- [ ] Criar ticket
- [ ] Listar tickets
- [ ] Atualizar status de ticket
- [ ] Adicionar comentário
- [ ] Ver histórico
- [ ] Dashboard carrega métricas
- [ ] Logout

### Roles
- [ ] USER pode criar tickets
- [ ] USER não pode atribuir tickets
- [ ] ATTENDANT pode atribuir tickets
- [ ] ATTENDANT pode mudar status
- [ ] ADMIN pode gerenciar usuários
- [ ] ADMIN tem acesso ao painel admin

### Performance
- [ ] Primeira carga < 3s
- [ ] Navegação entre páginas < 1s
- [ ] API response time < 500ms
- [ ] Sem memory leaks

---

## 🚀 Pós-Deploy

### Compartilhamento
- [ ] Post no LinkedIn com link
- [ ] Adicionar ao portfólio
- [ ] Compartilhar no GitHub profile
- [ ] Adicionar aos projetos do currículo

### Manutenção
- [ ] Monitorar logs primeira semana
- [ ] Verificar erros de usuários
- [ ] Coletar feedback
- [ ] Planejar melhorias

### Backup
- [ ] Backup do banco (se não automático)
- [ ] Código versionado (Git)
- [ ] Environment vars documentadas

---

## 🎉 Deploy Concluído!

Quando todos os checkboxes estiverem marcados:

1. ✅ Faça um café ☕
2. ✅ Celebre o deploy! 🎉
3. ✅ Compartilhe com o mundo! 🌍

---

## 🆘 Em Caso de Problemas

### Backend não responde
1. Verificar logs no Render
2. Confirmar DATABASE_URL
3. Verificar build logs
4. Testar health endpoint

### Frontend não carrega API
1. Verificar VITE_API_URL no Vercel
2. Confirmar CORS no backend
3. Verificar console do navegador
4. Testar API diretamente

### Erros de CORS
1. Verificar FRONTEND_URL no backend
2. Verificar VITE_API_URL no frontend
3. Ambos devem usar HTTPS
4. Whitelist correto

### Performance ruim
1. Verificar plano (Free hiberna)
2. Considerar upgrade
3. Otimizar queries do banco
4. Adicionar caching

---

## 📞 Suporte

- GitHub Issues: https://github.com/MarcioGil/HelpDeskFlow/issues
- Documentação: Ver docs/ no repositório
- Desenvolvedor: Marcio Gil

---

<div align="center">

**Boa sorte com o deploy! 🚀**

*Desenvolvido com ❤️ por Marcio Gil*

</div>
