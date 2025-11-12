# Script de Deploy - Backend
# Execute este script apos criar o banco de dados

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  HELPDESKFLOW - SETUP DE BANCO DE DADOS  " -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Solicita a DATABASE_URL
Write-Host "Cole a CONNECTION STRING do Neon.tech:" -ForegroundColor Yellow
Write-Host "(Exemplo: postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/helpdeskflow?sslmode=require)" -ForegroundColor Gray
Write-Host ""
$DATABASE_URL = Read-Host "DATABASE_URL"

if ([string]::IsNullOrWhiteSpace($DATABASE_URL)) {
    Write-Host ""
    Write-Host "[X] ERRO: DATABASE_URL nao pode estar vazia!" -ForegroundColor Red
    Write-Host ""
    exit 1
}

# Define a variavel de ambiente
$env:DATABASE_URL = $DATABASE_URL

Write-Host ""
Write-Host "[OK] DATABASE_URL configurada!" -ForegroundColor Green
Write-Host ""

# Navega para a pasta backend
Write-Host "Navegando para pasta backend..." -ForegroundColor Cyan
Set-Location -Path "c:\Projeto - HelpDeskFlow - Sistema de Chamadas Internas\HelpDeskFlow\backend"

# Verifica se esta na pasta correta
if (-not (Test-Path "package.json")) {
    Write-Host ""
    Write-Host "[X] ERRO: Nao encontrei o package.json!" -ForegroundColor Red
    Write-Host "Certifique-se de estar na pasta correta do projeto." -ForegroundColor Red
    Write-Host ""
    exit 1
}

Write-Host "[OK] Pasta backend encontrada!" -ForegroundColor Green
Write-Host ""

# Roda as migrations
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  PASSO 1: APLICANDO MIGRATIONS           " -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Criando tabelas no banco de dados..." -ForegroundColor Yellow
Write-Host ""

npx prisma migrate deploy

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "[X] ERRO ao aplicar migrations!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possiveis causas:" -ForegroundColor Yellow
    Write-Host "  1. Connection string incorreta" -ForegroundColor Gray
    Write-Host "  2. Banco de dados nao esta acessivel" -ForegroundColor Gray
    Write-Host "  3. Permissoes insuficientes" -ForegroundColor Gray
    Write-Host ""
    exit 1
}

Write-Host ""
Write-Host "[OK] Migrations aplicadas com sucesso!" -ForegroundColor Green
Write-Host ""

# Popula o banco com dados iniciais
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  PASSO 2: POPULANDO BANCO (SEED)         " -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Criando usuários e dados iniciais..." -ForegroundColor Yellow
Write-Host ""

npx prisma db seed

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "[X] ERRO ao popular banco!" -ForegroundColor Red
    Write-Host ""
    exit 1
}

Write-Host ""
Write-Host "[OK] Banco populado com sucesso!" -ForegroundColor Green
Write-Host ""

# Sucesso!
Write-Host "============================================" -ForegroundColor Green
Write-Host "         [OK] SETUP CONCLUIDO!            " -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Dados criados:" -ForegroundColor Cyan
Write-Host ""
Write-Host "ADMIN:" -ForegroundColor Yellow
Write-Host "   Email: admin@helpdesk.com" -ForegroundColor White
Write-Host "   Senha: admin123" -ForegroundColor White
Write-Host ""
Write-Host "ATENDENTE:" -ForegroundColor Yellow
Write-Host "   Email: maria@helpdesk.com" -ForegroundColor White
Write-Host "   Senha: maria123" -ForegroundColor White
Write-Host ""
Write-Host "USUARIO:" -ForegroundColor Yellow
Write-Host "   Email: joao@helpdesk.com" -ForegroundColor White
Write-Host "   Senha: joao123" -ForegroundColor White
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "PROXIMOS PASSOS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Acesse: https://dashboard.render.com/" -ForegroundColor White
Write-Host "2. Crie um Web Service" -ForegroundColor White
Write-Host "3. Conecte o repositorio: MarcioGil/Sistema-de-Chamados-Internos" -ForegroundColor White
Write-Host "4. Configure as variaveis de ambiente (incluindo esta DATABASE_URL)" -ForegroundColor White
Write-Host "5. Faca o deploy!" -ForegroundColor White
Write-Host ""
Write-Host "Guia completo: DEPLOY_FACIL.md" -ForegroundColor Gray
Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host ""

# Mantém a janela aberta
Read-Host "Pressione ENTER para fechar"
