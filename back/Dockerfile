FROM node:20-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY . ./

RUN npm run build

# EXPOSE 80
# CMD ["npm", "run", "preview"]

EXPOSE 80
CMD ["npm", "run", "start:prod"]

