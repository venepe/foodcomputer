# Set the base image to node
FROM node:8.9.4

RUN node -v

RUN mkdir /app
WORKDIR /app

COPY ./package*.json ./.babelrc ./
RUN npm install
EXPOSE 8080
CMD npm start
