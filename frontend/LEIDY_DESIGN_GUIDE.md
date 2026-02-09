# Design Leidy Cleaner - Páginas Criadas

## Visão Geral

Novo design profissional para o site Leidy Cleaner com componentes reutilizáveis e páginas totalmente funcionais. O design segue a identidade visual verde e clean do brand.

## Páginas Criadas

### 1. **Página Home** (`/leidy-home`)
- Hero section com call-to-action
- Seção de serviços (4 cards principais)
- Seção "Sobre"
- Seção de contato com formulário
- Totalmente responsiva

### 2. **Página Serviços** (`/servicos-leidy`)
- Grid de 6 serviços
- Descrição detalhada de cada serviço
- Preços informativos
- Seção "Por que escolher a Leidy Cleaner"
- Call-to-action

### 3. **Página Sobre** (`/sobre-leidy`)
- História da empresa
- Missão, Visão e Valores
- Razões para confiar
- Estatísticas
- Chamada para ação

### 4. **Página Contato** (`/contato-leidy`)
- Formulário de contato funcional
- Informações de contato (telefone, email, endereço)
- Horário de atendimento
- Redes sociais
- Seção FAQ (perguntas frequentes)
- Localização

## Componentes Reutilizáveis

### LeidyHeader
Local: `/frontend/src/components/Layout/LeidyHeader.jsx`

```jsx
import LeidyHeader from '../components/Layout/LeidyHeader';

// Uso em qualquer página
<LeidyHeader />
```

Características:
- Logo Leidy Cleaner
- Navegação desktop
- Menu mobile respondivo
- Links ativos

### LeidyFooter
Local: `/frontend/src/components/Layout/LeidyFooter.jsx`

```jsx
import LeidyFooter from '../components/Layout/LeidyFooter';

// Uso em qualquer página
<LeidyFooter />
```

Características:
- Informações da empresa
- Links rápidos
- Serviços
- Horário de atendimento
- Redes sociais

## Estilo e Cores

### Paleta de Cores
```css
--primary-green: #2e7d32       /* Verde escuro principal */
--secondary-green: #4caf50     /* Verde secundário */
--light-green: #8bc34a         /* Verde claro */
--dark-green: #1b5e20          /* Verde muito escuro */
--light-gray: #f5f5f5
--white: #ffffff
--text-dark: #333333
```

### Tailwind Classes Utilizadas
- `bg-green-700`, `bg-green-900`, `bg-green-500`, etc.
- `text-green-900`, `text-green-700`, etc.
- `hover:bg-green-900`, `hover:text-green-500`
- Responsividade: `md:`, `lg:`, `sm:`

## Como Usar

### Criar Uma Nova Página Usando o Design

```jsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LeidyHeader from '../components/Layout/LeidyHeader';
import LeidyFooter from '../components/Layout/LeidyFooter';

export default function MyPage() {
  return (
    <>
      <Head>
        <title>Minha Página - Leidy Cleaner</title>
        <meta name="description" content="Descrição da página" />
      </Head>

      <LeidyHeader />

      {/* Seu conteúdo aqui */}

      <LeidyFooter />
    </>
  );
}
```

### Adicionar Link na Navegação

Edite `/frontend/src/components/Layout/LeidyHeader.jsx`:

```jsx
<li>
  <Link href="/sua-pagina" className={`font-semibold transition-colors ${isActive('/sua-pagina') ? 'text-green-600' : 'text-green-900 hover:text-green-500'}`}>
    Sua Página
  </Link>
</li>
```

## Features Implementadas

✅ Design responsivo (mobile, tablet, desktop)
✅ Navegação fluida
✅ Componentes reutilizáveis
✅ Formulários funcionais (com validação básica)
✅ Paleta de cores consistente
✅ SEO-friendly (Head tags)
✅ Animações e transições
✅ Menu mobile com toggle
✅ Links internos suave (smooth scroll)
✅ Social media links

## Próximos Passos

1. **Integração de Backend**
   - Conectar formulários ao backend
   - Armazenar contatos no banco de dados
   - Enviar emails de confirmação

2. **Adicionar Mais Seções**
   - Testemunhos de clientes
   - Galeria de fotos
   - Blog de dicas

3. **Melhorias de Performance**
   - Otimizar imagens
   - Lazy loading
   - Caching

4. **Analytics**
   - Google Analytics
   - Rastreamento de conversão
   - Heatmap

## Arquivos Criados

```
/frontend/src/
  ├── components/Layout/
  │   ├── LeidyHeader.jsx      (Novo)
  │   └── LeidyFooter.jsx      (Novo)
  └── pages/
      ├── leidy-home.jsx       (Novo)
      ├── servicos-leidy.jsx   (Novo)
      ├── sobre-leidy.jsx      (Novo)
      └── contato-leidy.jsx    (Novo)
```

## URLs das Páginas

- **Home**: `http://localhost:3001/leidy-home`
- **Serviços**: `http://localhost:3001/servicos-leidy`
- **Sobre**: `http://localhost:3001/sobre-leidy`
- **Contato**: `http://localhost:3001/contato-leidy`

## Customização

### Alterar Dados de Contato

Edite `/frontend/src/pages/contato-leidy.jsx`:
```jsx
<p className="text-gray-700">(11) 99999-9999</p>  // Telefone
<p className="text-gray-700">contato@leidycleaner.com.br</p>  // Email
```

### Alterar Mensagem de Boas-vindas

Edite `/frontend/src/pages/leidy-home.jsx`:
```jsx
<h1 className="text-5xl md:text-6xl font-bold mb-5 leading-tight">
  Sua mensagem aqui
</h1>
```

## Suporte e Ajuda

Para adicionar novos componentes ou seções, mantenha a consistência com:
- Paleta de cores verde
- Tipografia (font-family: 'Segoe UI')
- Espaçamento (py-20, px-4, etc)
- Componentes responsivos

## License

Todos os componentes e páginas criadas são parte do projeto Leidy Cleaner.
