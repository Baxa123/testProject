FROM node:latest
WORKDIR /apps
COPY package.json .
RUN npm install
COPY .. .
EXPOSE 4200 49153
CMD npm run start
