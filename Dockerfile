FROM node:22

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package*.json ./
USER node

RUN npm install
COPY --chown=node:node . .
EXPOSE 3251

CMD [ "npm", "start" ]