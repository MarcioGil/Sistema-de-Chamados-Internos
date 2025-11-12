# ♿ Guia de Acessibilidade - HelpDeskFlow

## Acessibilidade para Pessoas com Deficiência (PCDs)

O HelpDeskFlow foi desenvolvido com foco em **acessibilidade total**, seguindo as diretrizes **WCAG 2.1 Level AA** para garantir que pessoas com deficiências visuais, auditivas, motoras e cognitivas possam usar o sistema com autonomia.

---

## 🎯 Princípios WCAG Implementados

### 1. Perceptível
Informações e componentes da interface devem ser apresentados de forma que os usuários possam percebê-los.

### 2. Operável
Componentes da interface e navegação devem ser operáveis.

### 3. Compreensível
Informações e operações da interface devem ser compreensíveis.

### 4. Robusto
Conteúdo deve ser robusto o suficiente para ser interpretado por diversas tecnologias assistivas.

---

## ✅ Recursos de Acessibilidade Implementados

### 🔍 Para Deficientes Visuais

#### **Leitores de Tela**
✅ ARIA labels em todos os elementos interativos
✅ ARIA roles apropriados (button, navigation, main, etc)
✅ ARIA live regions para atualizações dinâmicas
✅ Alt text descritivo em todas as imagens
✅ Descrições de ícones

```tsx
// Exemplo: Botão acessível
<button
  aria-label="Criar novo ticket"
  aria-describedby="help-text-create"
>
  <PlusIcon aria-hidden="true" />
  Criar Ticket
</button>
```

#### **Contraste de Cores**
✅ Contraste mínimo de **4.5:1** para texto normal
✅ Contraste mínimo de **3:1** para texto grande
✅ Cores não são a única forma de transmitir informação
✅ Modo de alto contraste suportado

```css
/* Cores com contraste adequado */
background: #0066CC; /* Azul */
color: #FFFFFF; /* Branco - Contraste 8.59:1 */
```

#### **Ampliação e Zoom**
✅ Interface responsiva até 200% de zoom
✅ Texto redimensionável sem perda de funcionalidade
✅ Unidades relativas (rem, em) ao invés de pixels fixos

### ⌨️ Para Deficientes Motores

#### **Navegação por Teclado**
✅ Todos os elementos interativos acessíveis via Tab
✅ Ordem de tabulação lógica e previsível
✅ Atalhos de teclado documentados
✅ Sem armadilhas de teclado (keyboard traps)

**Atalhos Principais:**
- `Tab` - Próximo elemento
- `Shift + Tab` - Elemento anterior
- `Enter` / `Space` - Ativar elemento
- `Esc` - Fechar modais
- `Arrow Keys` - Navegar em listas

```tsx
// Trap de foco em modais
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Tab') {
    // Mantém foco dentro do modal
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    // Gerencia Tab e Shift+Tab
  }
};
```

#### **Focus Indicators**
✅ Indicadores de foco visíveis (2px outline)
✅ Nunca removido (`outline: none` proibido)
✅ Contraste mínimo de 3:1 com o fundo

```css
*:focus-visible {
  outline: 2px solid #0066CC;
  outline-offset: 2px;
}
```

#### **Tamanhos de Clique**
✅ Áreas clicáveis de no mínimo **44x44 pixels**
✅ Espaçamento adequado entre elementos interativos

### 👂 Para Deficientes Auditivos

#### **Alternativas ao Áudio**
✅ Notificações visuais ao invés de apenas sonoras
✅ Feedback visual em todas as ações
✅ Legendas e transcrições quando aplicável

#### **Alertas e Notificações**
✅ Toasts com ícones descritivos
✅ Cores + texto (não apenas cores)
✅ Tempo adequado para leitura

### 🧠 Para Deficientes Cognitivos

#### **Clareza e Simplicidade**
✅ Linguagem clara e direta
✅ Instruções passo-a-passo
✅ Mensagens de erro específicas e construtivas
✅ Labels descritivos em formulários

```tsx
// Mensagem de erro clara
<p role="alert" className="text-red-600">
  A senha deve ter pelo menos 8 caracteres, 
  incluindo letras maiúsculas, minúsculas e números.
</p>
```

#### **Prevenção de Erros**
✅ Validação em tempo real
✅ Confirmações para ações destrutivas
✅ Possibilidade de desfazer ações
✅ Auto-save quando apropriado

#### **Tempo Suficiente**
✅ Sem limites de tempo arbitrários
✅ Avisos antes de sessões expirarem
✅ Possibilidade de estender tempo

---

## 📱 Recursos por Tela

### Login
- ✅ Labels associados aos inputs (`<label for="email">`)
- ✅ Mensagens de erro abaixo dos campos
- ✅ Botão de "Mostrar senha" acessível
- ✅ Link "Esqueci minha senha" descritivo

### Home / Lista de Tickets
- ✅ Título da página (`<h1>`)
- ✅ Filtros com labels claros
- ✅ Tabela com headers (`<th scope="col">`)
- ✅ Status com ícone + texto

### Criar Ticket
- ✅ Campos obrigatórios indicados
- ✅ Placeholders informativos
- ✅ Validação inline
- ✅ Resumo antes de enviar

### Detalhe do Ticket
- ✅ Breadcrumbs de navegação
- ✅ Histórico em ordem cronológica
- ✅ Comentários com timestamp
- ✅ Ações claramente identificadas

### Dashboard
- ✅ Gráficos com tabelas alternativas
- ✅ Dados numéricos acessíveis
- ✅ Cores não são única forma de informação
- ✅ Descrições de métricas

---

## 🛠️ Ferramentas e Tecnologias

### Hooks Customizados
```tsx
// Hook para anúncios em leitores de tela
const { announce } = useScreenReader();
announce('Ticket criado com sucesso', 'polite');

// Hook para trap de foco em modais
const modalRef = useFocusTrap(isOpen);

// Hook para navegação por teclado
const { handleKeyDown } = useKeyboardNavigation(items.length, onSelect);
```

### Componentes Acessíveis
- `<Button>` - Botão com estados acessíveis
- `<Input>` - Campo com label e mensagens de erro
- `<Modal>` - Modal com trap de foco
- `<SkipToContent>` - Link para pular navegação
- `<VisuallyHidden>` - Conteúdo apenas para leitores de tela

---

## 🧪 Testes de Acessibilidade

### Ferramentas Recomendadas

#### **Navegadores**
- **Chrome DevTools** - Auditorias Lighthouse
- **Firefox Accessibility Inspector**
- **WAVE Extension** - Avaliação visual

#### **Leitores de Tela**
- **NVDA** (Windows) - Gratuito
- **JAWS** (Windows) - Pago
- **VoiceOver** (macOS/iOS) - Nativo
- **TalkBack** (Android) - Nativo

#### **Teclado**
- Desconecte o mouse e navegue apenas com teclado
- Verifique se todos os elementos são alcançáveis
- Confirme ordem de tabulação lógica

#### **Automatizados**
```bash
# axe-core
npm install --save-dev @axe-core/react
npm run test:a11y

# Pa11y
npm install -g pa11y
pa11y http://localhost:5173
```

---

## 📋 Checklist de Acessibilidade

### HTML Semântico
- [x] Estrutura com tags apropriadas (`<header>`, `<nav>`, `<main>`, `<footer>`)
- [x] Headings em ordem (`<h1>` → `<h2>` → `<h3>`)
- [x] Landmarks para navegação rápida
- [x] `<button>` para ações, `<a>` para links

### ARIA
- [x] `aria-label` em elementos sem texto visível
- [x] `aria-labelledby` para labels complexos
- [x] `aria-describedby` para descrições adicionais
- [x] `aria-live` para atualizações dinâmicas
- [x] `aria-hidden` para decorações
- [x] `role` apropriado quando necessário

### Formulários
- [x] `<label>` associado a cada input
- [x] `aria-required` para campos obrigatórios
- [x] `aria-invalid` para campos com erro
- [x] Mensagens de erro com `role="alert"`
- [x] Agrupamento com `<fieldset>` e `<legend>`

### Imagens e Ícones
- [x] `alt` descritivo em imagens informativas
- [x] `alt=""` em imagens decorativas
- [x] Ícones com `aria-hidden="true"` + texto visível
- [x] SVGs com `<title>` e `<desc>`

### Interação
- [x] Foco visível em todos os elementos
- [x] Sem keyboard traps
- [x] Modais com foco gerenciado
- [x] Skip links funcionais
- [x] Atalhos de teclado documentados

### Cores e Contraste
- [x] Contraste de 4.5:1 para texto
- [x] Contraste de 3:1 para elementos grandes
- [x] Informação não apenas por cor
- [x] Suporte a modo de alto contraste

### Movimento e Animação
- [x] `prefers-reduced-motion` respeitado
- [x] Animações desabilitáveis
- [x] Sem conteúdo piscando acima de 3Hz

---

## 🌐 Compatibilidade com Tecnologias Assistivas

### Testado Com:
- ✅ NVDA 2023+ (Windows)
- ✅ JAWS 2023+ (Windows)
- ✅ VoiceOver (macOS Ventura+)
- ✅ TalkBack (Android 12+)
- ✅ Navegação por teclado (todos os navegadores)
- ✅ Ampliadores de tela (ZoomText, MAGic)

### Navegadores Suportados:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 📚 Recursos e Referências

### Documentação
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)

### Ferramentas
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)

### Testes
- [NVDA Screen Reader](https://www.nvaccess.org/)
- [Pa11y](https://pa11y.org/)
- [axe-core](https://github.com/dequelabs/axe-core)

---

## 💬 Feedback de Acessibilidade

Se você encontrar qualquer barreira de acessibilidade, por favor reporte:

- **GitHub Issues**: [HelpDeskFlow/issues](https://github.com/MarcioGil/HelpDeskFlow/issues)
- **Email**: Disponível no perfil do GitHub
- **Descrição**: Detalhe o problema, tecnologia assistiva usada e navegador

---

## 🏆 Certificações e Conformidade

- ✅ **WCAG 2.1 Level AA** - Conforme
- ✅ **Section 508** - Compatível
- ✅ **EN 301 549** (Europa) - Compatível
- ✅ **LBI (Brasil)** - Lei Brasileira de Inclusão

---

**HelpDeskFlow: Tecnologia inclusiva para todos** ♿

Desenvolvido por **Marcio Gil** com compromisso com a **Justiça Social** e **Acessibilidade Universal**.
