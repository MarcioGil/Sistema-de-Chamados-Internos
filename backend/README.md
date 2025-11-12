# Backend - HelpDeskFlow

API REST do sistema HelpDeskFlow.

## 🚀 Instalação

```bash
npm install
```

## ⚙️ Configuração

Copie o arquivo `.env.example` para `.env` e configure:

```bash
cp .env.example .env
```

Variáveis obrigatórias:
- `DATABASE_URL`: Connection string do PostgreSQL
- `JWT_SECRET`: Chave secreta para JWT (use uma chave forte!)
- `PORT`: Porta do servidor (padrão: 3333)

## 🗄️ Banco de Dados

```bash
# Gera o cliente Prisma
npm run prisma:generate

# Cria as tabelas
npm run prisma:migrate

# Popula com dados de exemplo
npm run prisma:seed

# Abre o Prisma Studio (interface gráfica)
npm run prisma:studio
```

## 🏃 Execução

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

## 📡 Endpoints

Veja a documentação completa no [README principal](../README.md#-api-endpoints).

## 🔒 Segurança

- JWT com expiração de 7 dias
- Bcrypt com 12 rounds
- Rate limiting configurado
- Helmet para headers seguros
- CORS configurado
- Validação com Zod

## 📁 Estrutura

```
backend/
├── prisma/
│   ├── schema.prisma      # Schema do banco
│   └── seed.ts            # Dados de exemplo
├── src/
│   ├── controllers/       # Controladores
│   ├── services/          # Lógica de negócio
│   ├── middlewares/       # Middlewares
│   ├── routes/            # Rotas
│   └── server.ts          # Servidor Express
└── package.json
```
