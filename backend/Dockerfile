# Estágio ÚNICO - Simples e direto

# 1. Imagem base
FROM node:20-alpine

# 2. Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# 3. Copia os arquivos de dependências
COPY package*.json ./

# 4. Instala TODAS as dependências (simples, sem otimizar para produção)
RUN npm install

# 5. Copia o restante do código da aplicação
COPY . .

# 6. Compila o código TypeScript para JavaScript
RUN npm run build

# 7. Expõe a porta que a aplicação vai rodar
EXPOSE 3000

# 8. Comando para iniciar a aplicação
CMD ["npm", "start"]
