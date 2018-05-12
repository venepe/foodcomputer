# Set the base image to raspbian
FROM ubuntu:14.04

# Install Node.js & other dependencies
RUN apt-get update && \
        apt-get -y install git && \
        apt-get -y install curl && \
        apt-get -y install sudo && \
        curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - && \
        apt-get -y install python build-essential nodejs

RUN node -v

RUN mkdir /app
WORKDIR /app

COPY ./package*.json ./.babelrc ./
RUN npm install
EXPOSE 8001
CMD npm start
