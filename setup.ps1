# Script de Setup Automático - HelpDeskFlow
# Execute: .\setup.ps1

Write-Host "🎫 HelpDeskFlow - Setup Automático" -ForegroundColor Cyan
Write-Host "====================================`n" -ForegroundColor Cyan

# Verifica Node.js
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js não encontrado! Instale em: https://nodejs.org/" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js $nodeVersion instalado`n" -ForegroundColor Green

# Verifica PostgreSQL
Write-Host "Verificando PostgreSQL..." -ForegroundColor Yellow
$pgVersion = psql --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  PostgreSQL não encontrado no PATH" -ForegroundColor Yellow
    Write-Host "   Certifique-se que está instalado e rodando`n" -ForegroundColor Yellow
} else {
    Write-Host "✅ PostgreSQL instalado`n" -ForegroundColor Green
}

# Backend Setup
Write-Host "📦 Instalando dependências do Backend..." -ForegroundColor Yellow
Set-Location backend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao instalar dependências do backend" -ForegroundColor Red
    exit 1
}

# Verifica .env
if (!(Test-Path ".env")) {
    Write-Host "`n📝 Criando arquivo .env..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "⚠️  IMPORTANTE: Edite o arquivo backend\.env com suas configurações!" -ForegroundColor Yellow
    Write-Host "   - DATABASE_URL (PostgreSQL)" -ForegroundColor Yellow
    Write-Host "   - JWT_SECRET (use uma chave forte)`n" -ForegroundColor Yellow
    
    Write-Host "Gerando JWT_SECRET..." -ForegroundColor Yellow
    $jwtSecret = node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
    Write-Host "Sua JWT_SECRET: $jwtSecret`n" -ForegroundColor Green
    Write-Host "Copie e cole no arquivo .env`n" -ForegroundColor Green
}

Write-Host "✅ Backend configurado`n" -ForegroundColor Green
Set-Location ..

# Frontend Setup
Write-Host "📦 Instalando dependências do Frontend..." -ForegroundColor Yellow
Set-Location frontend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao instalar dependências do frontend" -ForegroundColor Red
    exit 1
}

if (!(Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
}

Write-Host "✅ Frontend configurado`n" -ForegroundColor Green
Set-Location ..

# Resumo
Write-Host "`n╔═══════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                   ║" -ForegroundColor Cyan
Write-Host "║     ✅ Setup concluído com sucesso!              ║" -ForegroundColor Cyan
Write-Host "║                                                   ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

Write-Host "📋 Próximos passos:`n" -ForegroundColor Yellow
Write-Host "1. Configure o arquivo backend\.env (DATABASE_URL e JWT_SECRET)" -ForegroundColor White
Write-Host "2. Execute as migrations:" -ForegroundColor White
Write-Host "   cd backend" -ForegroundColor Gray
Write-Host "   npm run prisma:generate" -ForegroundColor Gray
Write-Host "   npm run prisma:migrate" -ForegroundColor Gray
Write-Host "   npm run prisma:seed`n" -ForegroundColor Gray

Write-Host "3. Inicie os servidores:" -ForegroundColor White
Write-Host "   Terminal 1: cd backend && npm run dev" -ForegroundColor Gray
Write-Host "   Terminal 2: cd frontend && npm run dev`n" -ForegroundColor Gray

Write-Host "📚 Documentação completa em: README.md" -ForegroundColor Cyan
Write-Host "🎯 Guia detalhado em: PROXIMOS_PASSOS.md`n" -ForegroundColor Cyan
