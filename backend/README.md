# Estrutura Base para Backend

Este projeto serve como uma fundação robusta e escalável para aplicações backend construídas com Node.js, Express, TypeScript e SQL Server.

## Arquitetura

A arquitetura é modular e segue o princípio de separação de responsabilidades:

- `src/config`: Configurações da aplicação (variáveis de ambiente, etc.).
- `src/core`: Lógica central da aplicação (middlewares, erros, utils).
- `src/infra`: Camada de infraestrutura (conexão com banco de dados, serviços externos).
- `src/modules`: Onde a lógica de negócio reside. Cada pasta é um módulo/feature autocontido.
- `src/shared`: Código compartilhado entre módulos (interfaces, constantes).
- `src/server.ts`: Ponto de entrada que inicializa o servidor.
- `src/app.ts`: Configuração da instância do Express.

## Como Adicionar uma Nova Feature (Módulo)

1.  Crie uma nova pasta dentro de `src/modules/`. Ex: `src/modules/users`.
2.  Dentro da pasta, crie os arquivos necessários para a feature:
    - `users.controller.ts`: Controla o fluxo de requisição/resposta.
    - `users.service.ts`: Contém a lógica de negócio.
    - `users.repository.ts`: Lida com o acesso aos dados (interação com o banco).
    - `users.routes.ts`: Define as rotas da API para este módulo.
    - `users.schemas.ts`: (Opcional) Define os schemas de validação (Zod) para as requisições.
    - `users.types.ts`: (Opcional) Define os tipos e interfaces específicos do módulo.
3.  O arquivo `users.routes.ts` deve exportar um `express.Router`.
4.  O sistema de roteamento em `src/modules/index.ts` irá carregar e registrar automaticamente as novas rotas. Não é necessário alterar mais nenhum arquivo central.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento com hot-reload.
- `npm run build`: Compila o código TypeScript para JavaScript.
- `npm run start`: Inicia o servidor em modo de produção.
- `npm test`: Executa os testes.
