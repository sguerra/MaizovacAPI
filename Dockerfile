FROM node:lts-alpine3.12
RUN apk --no-cache add git
WORKDIR /maizovac-api
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN source .env
CMD ["npm", "run", "db-migration-undo","--production"]
CMD ["npm", "run", "db-migration","--production"]
CMD ["npm", "run", "db-seed-undo","--production"]
CMD ["npm", "run", "db-seed","--production"]
CMD ["npm", "run", "start"]