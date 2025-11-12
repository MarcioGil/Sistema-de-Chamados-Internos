# Frontend - HelpDeskFlow

Interface React do sistema HelpDeskFlow.

## 🚀 Instalação

```bash
npm install
```

## ⚙️ Configuração

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Variável opcional:
- `VITE_API_URL`: URL da API (padrão: http://localhost:3333/api)

## 🏃 Execução

### Desenvolvimento
```bash
npm run dev
```

### Build de Produção
```bash
npm run build
npm run preview
```

## ♿ Acessibilidade

Este frontend foi desenvolvido seguindo as diretrizes **WCAG 2.1 AA**:

- ✅ Navegação completa por teclado
- ✅ ARIA labels em todos os elementos interativos
- ✅ Contraste de cores adequado (mínimo 4.5:1)
- ✅ Foco visível (outline personalizado)
- ✅ Mensagens de erro acessíveis
- ✅ Formulários com labels associados
- ✅ Botões com estados loading
- ✅ Suporte a `prefers-reduced-motion`

### Testando com Leitores de Tela

- **Windows**: NVDA (gratuito)
- **macOS**: VoiceOver (nativo)
- **Linux**: Orca

### Navegação por Teclado

- `Tab` / `Shift+Tab`: Navegar entre elementos
- `Enter` / `Space`: Ativar botões/links
- `Esc`: Fechar modals
- `Arrow keys`: Navegar em listas/menus

## 📁 Estrutura

```
frontend/
├── src/
│   ├── components/
│   │   └── ui/           # Componentes acessíveis
│   ├── pages/            # Páginas
│   ├── services/         # Serviços de API
│   ├── store/            # Zustand stores
│   ├── types/            # TypeScript types
│   ├── utils/            # Utilitários
│   ├── App.tsx           # Componente raiz
│   └── main.tsx          # Entry point
├── index.html
└── package.json
```

## 🎨 Componentes UI

Todos os componentes foram criados com acessibilidade em mente:

- `Button` - Botão com loading e estados
- `Input` - Input com label e erros
- `TextArea` - TextArea acessível
- `Select` - Select com label
- `Card` - Card clicável
- `Badge` - Badge colorido
- `Loading` - Indicador de carregamento

## 🧪 Testes de Acessibilidade

Use estas ferramentas para validar:

- **axe DevTools** (extensão Chrome/Firefox)
- **WAVE** (web accessibility evaluation tool)
- **Lighthouse** (Chrome DevTools)
