FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 6001

CMD ["npm", "start"]
