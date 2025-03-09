# Используем официальный образ Node.js
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install --omit=dev

# Копируем весь код
COPY . .

# Собираем TypeScript в dist/
RUN npm run build

# Открываем порт для NestJS
EXPOSE 3001

# Запускаем приложение
CMD ["npm", "run", "start:prod"]
