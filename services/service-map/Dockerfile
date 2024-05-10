FROM node:18.18.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3004
CMD ["node", "dist/index.js"]
