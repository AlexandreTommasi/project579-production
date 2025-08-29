# Estrutura Frontend Foundation

Este projeto é uma base escalável e de alta qualidade para aplicações React, construída com Vite, TypeScript, e as melhores práticas do ecossistema moderno.

## Tecnologias

- **Framework**: React 18+
- **Build Tool**: Vite
- **Linguagem**: TypeScript
- **Estilização**: Styled Components
- **Roteamento**: React Router DOM
- **Gerenciamento de Estado**: Zustand
- **Testes**: Vitest & React Testing Library
- **Linting**: ESLint
- **Formatação**: Prettier

## Estrutura de Pastas

A arquitetura é modular e orientada a features, promovendo separação de responsabilidades e escalabilidade.

```
frontend/
├── public/                  # Arquivos estáticos
├── src/
│   ├── core/                # Infraestrutura central (roteamento, providers, config)
│   │   ├── api/             # Configuração do cliente API (ex: Axios)
│   │   ├── config/          # Variáveis de ambiente e configurações
│   │   ├── providers/       # Provedores de contexto globais
│   │   ├── routing/         # Definição de rotas
│   │   └── store/           # Gerenciamento de estado global (Zustand)
│   │
│   ├── features/            # Módulos de negócio (features da aplicação)
│   │   └── game/            # Exemplo de feature: Jogo de Adivinhação
│   │       ├── components/  # Componentes específicos da feature
│   │       ├── hooks/       # Hooks específicos da feature
│   │       ├── pages/       # Páginas da feature
│   │       └── types/       # Tipos TypeScript da feature
│   │
│   ├── shared/              # Recursos compartilhados entre features
│   │   ├── assets/          # Imagens, fontes, etc.
│   │   ├── components/      # Componentes de UI reutilizáveis (Button, Input, Layout)
│   │   ├── hooks/           # Hooks reutilizáveis
│   │   ├── styles/          # Estilos globais, tema, etc.
│   │   ├── types/           # Tipos e interfaces globais
│   │   └── utils/           # Funções utilitárias
│   │
│   ├── App.tsx              # Componente raiz da aplicação
│   └── main.tsx             # Ponto de entrada da aplicação
│
├── .eslintrc.cjs
├── .gitignore
├── .prettierrc
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── vitest.config.ts
```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila a aplicação para produção.
- `npm run lint`: Executa o linter para análise de código.
- `npm run preview`: Inicia um servidor local para visualizar o build de produção.
- `npm run test`: Executa os testes via Vitest.

## Como Adicionar uma Nova Feature

1.  Crie uma nova pasta dentro de `src/features/`, por exemplo, `src/features/minha-nova-feature`.
2.  Desenvolva os componentes, hooks, páginas e tipos necessários dentro dessa pasta.
3.  Crie uma nova rota no arquivo `src/core/routing/AppRoutes.tsx` para a página principal da sua feature, preferencialmente usando `React.lazy` para code-splitting.
4.  Exporte os componentes ou páginas que precisam ser acessados externamente através de um `index.ts` na raiz da pasta da feature.
