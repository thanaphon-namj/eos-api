FROM node:20.18.0-bullseye-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 9092

CMD ["node", "dist/main"]
