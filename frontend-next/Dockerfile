FROM node:22-alpine

ENV DIR /app-next
WORKDIR $DIR

COPY . $DIR

RUN npm install 

RUN npm run build

RUN npm prune --production

EXPOSE 3000

#Mejor opción
CMD ["npm", "start"]