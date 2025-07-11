FROM node:22-alpine

ENV DIR /app
WORKDIR $DIR

COPY . $DIR

RUN npm install
#RUN npm test
RUN npm run build
RUN npm prune --production

EXPOSE 3000

CMD ["npm", "start"]
