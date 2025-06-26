# wb-frontend/Dockerfile
FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Копируем весь фронтенд
COPY . .

EXPOSE 3000

# Dev-server React (или замените на сборку + nginx)
CMD ["npm", "start"]
