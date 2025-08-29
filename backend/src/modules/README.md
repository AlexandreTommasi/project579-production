# Módulos da Aplicação

Esta pasta contém a lógica de negócio da aplicação, dividida em módulos independentes.

## Estrutura de um Módulo

Cada subpasta aqui representa um módulo ou uma feature da API. A estrutura recomendada para um módulo é:

- `nome-do-modulo/`
  - `nome-do-modulo.controller.ts`: Responsável por receber as requisições HTTP, validar os dados de entrada (usando schemas) e chamar os serviços apropriados. Ele formata a resposta HTTP.
  - `nome-do-modulo.service.ts`: Contém a lógica de negócio pura. Orquestra as operações, validações de negócio e interage com o repositório.
  - `nome-do-modulo.repository.ts`: Camada de acesso a dados. Contém todas as queries e lógicas para interagir com o banco de dados.
  - `nome-do-modulo.routes.ts`: Define as rotas (endpoints) para o módulo e as associa aos métodos do controller. **Este é o único arquivo que o sistema de roteamento dinâmico irá carregar.**
  - `nome-do-modulo.schemas.ts`: (Opcional) Define os schemas de validação (ex: Zod) para as requisições do módulo.
  - `nome-do-modulo.types.ts`: (Opcional) Define as interfaces e tipos TypeScript específicos para este módulo.

## Carregamento Automático de Rotas

O arquivo `src/modules/index.ts` é responsável por escanear todas as subpastas dentro de `src/modules`, encontrar os arquivos que terminam com `.routes.ts`, e registrar as rotas no roteador principal da aplicação.

Isso significa que para adicionar uma nova feature, basta criar a pasta com a estrutura acima. Nenhuma modificação nos arquivos centrais (`app.ts`, `server.ts`) é necessária.
