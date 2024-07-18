# Estágio 1: Construção da aplicação
FROM node:20 AS build

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar todo o código fonte para o diretório de trabalho
COPY . .

# Construir a aplicação Angular
RUN npm run build --prod


# Estágio 2: Servir a aplicação
FROM nginx:alpine

# Copiar os arquivos construídos da aplicação Angular para o diretório padrão do nginx
COPY --from=build /app/dist/front /usr/share/nginx/html

# Expor a porta 80 para acessar a aplicação
EXPOSE 80

# Comando para rodar o nginx
CMD ["nginx", "-g", "daemon off;"]
