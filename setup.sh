#!/bin/bash

# Script de Setup Automático - HelpDeskFlow
# Execute: chmod +x setup.sh && ./setup.sh

echo "🎫 HelpDeskFlow - Setup Automático"
echo "===================================="
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Verifica Node.js
echo -e "${YELLOW}Verificando Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não encontrado! Instale em: https://nodejs.org/${NC}"
    exit 1
fi
NODE_VERSION=$(node --version)
echo -e "${GREEN}✅ Node.js $NODE_VERSION instalado${NC}"
echo ""

# Verifica PostgreSQL
echo -e "${YELLOW}Verificando PostgreSQL...${NC}"
if ! command -v psql &> /dev/null; then
    echo -e "${YELLOW}⚠️  PostgreSQL não encontrado no PATH${NC}"
    echo -e "${YELLOW}   Certifique-se que está instalado e rodando${NC}"
else
    PG_VERSION=$(psql --version)
    echo -e "${GREEN}✅ PostgreSQL instalado${NC}"
fi
echo ""

# Backend Setup
echo -e "${YELLOW}📦 Instalando dependências do Backend...${NC}"
cd backend
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao instalar dependências do backend${NC}"
    exit 1
fi

# Verifica .env
if [ ! -f ".env" ]; then
    echo ""
    echo -e "${YELLOW}📝 Criando arquivo .env...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}⚠️  IMPORTANTE: Edite o arquivo backend/.env com suas configurações!${NC}"
    echo -e "${YELLOW}   - DATABASE_URL (PostgreSQL)${NC}"
    echo -e "${YELLOW}   - JWT_SECRET (use uma chave forte)${NC}"
    echo ""
    
    echo -e "${YELLOW}Gerando JWT_SECRET...${NC}"
    JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
    echo -e "${GREEN}Sua JWT_SECRET: $JWT_SECRET${NC}"
    echo -e "${GREEN}Copie e cole no arquivo .env${NC}"
    echo ""
fi

echo -e "${GREEN}✅ Backend configurado${NC}"
echo ""
cd ..

# Frontend Setup
echo -e "${YELLOW}📦 Instalando dependências do Frontend...${NC}"
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao instalar dependências do frontend${NC}"
    exit 1
fi

if [ ! -f ".env" ]; then
    cp .env.example .env
fi

echo -e "${GREEN}✅ Frontend configurado${NC}"
echo ""
cd ..

# Resumo
echo ""
echo -e "${CYAN}╔═══════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║                                                   ║${NC}"
echo -e "${CYAN}║     ✅ Setup concluído com sucesso!              ║${NC}"
echo -e "${CYAN}║                                                   ║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${YELLOW}📋 Próximos passos:${NC}"
echo ""
echo -e "${NC}1. Configure o arquivo backend/.env (DATABASE_URL e JWT_SECRET)${NC}"
echo -e "${NC}2. Execute as migrations:${NC}"
echo -e "   ${CYAN}cd backend${NC}"
echo -e "   ${CYAN}npm run prisma:generate${NC}"
echo -e "   ${CYAN}npm run prisma:migrate${NC}"
echo -e "   ${CYAN}npm run prisma:seed${NC}"
echo ""

echo -e "${NC}3. Inicie os servidores:${NC}"
echo -e "   ${CYAN}Terminal 1: cd backend && npm run dev${NC}"
echo -e "   ${CYAN}Terminal 2: cd frontend && npm run dev${NC}"
echo ""

echo -e "${CYAN}📚 Documentação completa em: README.md${NC}"
echo -e "${CYAN}🎯 Guia detalhado em: PROXIMOS_PASSOS.md${NC}"
echo ""
