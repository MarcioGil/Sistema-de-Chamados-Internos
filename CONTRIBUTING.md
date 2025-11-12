# 🤝 Guia de Contribuição - HelpDeskFlow

Obrigado por considerar contribuir com o HelpDeskFlow! Este documento fornece diretrizes para contribuir com o projeto.

---

## 📋 Código de Conduta

Este projeto segue um código de conduta baseado em respeito, inclusão e colaboração. Ao participar, você concorda em:

- ✅ Ser respeitoso com todos os colaboradores
- ✅ Aceitar críticas construtivas
- ✅ Focar no que é melhor para a comunidade
- ✅ Demonstrar empatia com outros membros
- ✅ Promover acessibilidade e inclusão

---

## 🚀 Como Contribuir

### 1. Reportar Bugs

Se encontrou um bug, abra uma [issue](https://github.com/MarcioGil/HelpDeskFlow/issues) com:

```markdown
**Descrição do Bug**
Descrição clara do problema

**Passos para Reproduzir**
1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

**Comportamento Esperado**
O que deveria acontecer

**Screenshots**
Se aplicável, adicione screenshots

**Ambiente**
- OS: [ex: Windows 11]
- Navegador: [ex: Chrome 120]
- Versão: [ex: 1.0.0]

**Informações Adicionais**
Qualquer contexto adicional
```

### 2. Sugerir Melhorias

Para sugestões de features, crie uma issue com:

```markdown
**Descrição da Feature**
Descrição clara da funcionalidade

**Problema que Resolve**
Qual problema esta feature resolveria?

**Solução Proposta**
Como você imagina a implementação?

**Alternativas Consideradas**
Outras abordagens que você pensou

**Impacto em Acessibilidade**
Como isso afeta usuários com deficiências?
```

### 3. Contribuir com Código

#### **Fork e Clone**

```bash
# Fork o repositório no GitHub
# Clone seu fork
git clone https://github.com/SEU_USUARIO/HelpDeskFlow.git
cd HelpDeskFlow

# Adicione o repositório original como upstream
git remote add upstream https://github.com/MarcioGil/HelpDeskFlow.git
```

#### **Crie uma Branch**

```bash
# Atualize main
git checkout main
git pull upstream main

# Crie branch para sua feature/fix
git checkout -b feature/nome-da-feature
# ou
git checkout -b fix/nome-do-bug
```

**Convenção de Branches:**
- `feature/` - Novas funcionalidades
- `fix/` - Correções de bugs
- `docs/` - Documentação
- `refactor/` - Refatoração
- `test/` - Testes
- `chore/` - Tarefas gerais

#### **Desenvolva**

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

**Diretrizes de Código:**

1. **TypeScript**: Todo código deve ser tipado
2. **Linting**: Rode `npm run lint` antes de commitar
3. **Formatação**: Use Prettier (configuração no projeto)
4. **Testes**: Adicione testes quando aplicável
5. **Acessibilidade**: Mantenha WCAG 2.1 AA

#### **Commit**

Siga o [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "tipo(escopo): descrição curta

Descrição mais detalhada se necessário.

Refs #numero-da-issue"
```

**Tipos de Commit:**
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação (não afeta código)
- `refactor:` - Refatoração
- `test:` - Testes
- `chore:` - Tarefas gerais

**Exemplos:**
```bash
feat(tickets): adiciona filtro por data de criação

Implementa filtro que permite usuários 
filtrarem tickets por range de datas.

Refs #42

fix(auth): corrige expiração de token JWT

O token estava expirando após 1 dia ao invés de 7.
Atualizado para 7d conforme documentação.

Fixes #38

docs(readme): atualiza instruções de instalação

Adiciona passo sobre geração de JWT_SECRET.
```

#### **Push e Pull Request**

```bash
# Push para seu fork
git push origin feature/nome-da-feature

# Abra um Pull Request no GitHub
```

**Template de Pull Request:**

```markdown
## Descrição
Descrição clara das mudanças

## Tipo de Mudança
- [ ] Bug fix (não quebra features existentes)
- [ ] Nova feature (adiciona funcionalidade)
- [ ] Breaking change (altera comportamento existente)
- [ ] Documentação

## Checklist
- [ ] Código segue padrões do projeto
- [ ] Self-review realizado
- [ ] Comentários em código complexo
- [ ] Documentação atualizada
- [ ] Testes adicionados/atualizados
- [ ] Acessibilidade mantida (WCAG 2.1 AA)
- [ ] Build passa sem erros
- [ ] Linting passa sem warnings

## Screenshots (se aplicável)

## Issues Relacionadas
Refs #numero-da-issue
```

---

## 🎨 Padrões de Código

### Backend (Node.js + TypeScript)

```typescript
// ✅ BOM: Tipagem clara, validação com Zod
export const createTicketSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(10),
  category: z.enum(['TI', 'RH', 'FINANCEIRO']),
});

// ✅ BOM: Async/await, tratamento de erro
async function createTicket(data: CreateTicketInput) {
  try {
    const validated = createTicketSchema.parse(data);
    return await prisma.ticket.create({ data: validated });
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError(error.errors);
    }
    throw error;
  }
}

// ❌ RUIM: Sem tipagem, sem validação
async function createTicket(data) {
  return await prisma.ticket.create({ data });
}
```

### Frontend (React + TypeScript)

```tsx
// ✅ BOM: Componente tipado, acessível, com JSDoc
/**
 * Botão acessível seguindo WCAG 2.1 AA
 */
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  'aria-label'?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  ...ariaProps
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
      {...ariaProps}
    >
      {children}
    </button>
  );
};

// ❌ RUIM: Sem tipagem, não acessível
export const Button = ({ children, onClick }) => {
  return <div onClick={onClick}>{children}</div>;
};
```

### Acessibilidade

```tsx
// ✅ BOM: ARIA completo, navegação por teclado
<button
  aria-label="Fechar modal"
  aria-controls="modal-content"
  aria-expanded={isOpen}
  onClick={handleClose}
  onKeyDown={(e) => e.key === 'Escape' && handleClose()}
>
  <CloseIcon aria-hidden="true" />
</button>

// ❌ RUIM: Sem ARIA, ícone sem contexto
<div onClick={handleClose}>
  <CloseIcon />
</div>
```

---

## 🧪 Testes

### Backend

```typescript
// Teste de integração
describe('Ticket API', () => {
  it('should create ticket with valid data', async () => {
    const response = await request(app)
      .post('/api/tickets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Problema no sistema',
        description: 'Sistema não carrega',
        category: 'TI',
      });
    
    expect(response.status).toBe(201);
    expect(response.body.data.title).toBe('Problema no sistema');
  });
});
```

### Frontend

```tsx
// Teste de componente
import { render, screen, fireEvent } from '@testing-library/react';

describe('Button', () => {
  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be accessible to screen readers', () => {
    render(<Button aria-label="Submit form">Send</Button>);
    expect(screen.getByLabelText('Submit form')).toBeInTheDocument();
  });
});
```

---

## 📚 Recursos Úteis

### Documentação
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Prisma Documentation](https://www.prisma.io/docs)

### Acessibilidade
- [WCAG Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Testing with Screen Readers](https://webaim.org/articles/screenreader_testing/)

### Git
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Best Practices](https://git-scm.com/book/en/v2)

---

## 🏆 Reconhecimento

Todos os contribuidores serão mencionados no README.md e releases.

---

## 💬 Dúvidas?

- Abra uma [Discussion](https://github.com/MarcioGil/HelpDeskFlow/discussions)
- Entre em contato via [LinkedIn](https://linkedin.com/in/márcio-gil-1b7669309)

---

**Obrigado por contribuir para um sistema mais acessível e inclusivo!** ❤️

Desenvolvido com 💙 por **Marcio Gil** e comunidade
