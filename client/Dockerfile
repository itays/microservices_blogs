FROM node:16-alpine

ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install
COPY ./ ./
# EXPOSE 8080
CMD ["npm", "start"]
