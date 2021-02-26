FROM node:lts-alpine3.12
RUN apk --no-cache add git
WORKDIR /maizovac-api
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN source .env
CMD ["npm", "run", "start"]