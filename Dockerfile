FROM node:22-alpine

WORKDIR /app
COPY package.json nik.js cli.js ./

USER node
ENTRYPOINT ["node", "/app/cli.js"]
