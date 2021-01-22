FROM ubuntu:latest
FROM node:lts-alpine as build-stage

# Working directory
WORKDIR /app

# Dependencies
COPY package.json ./
RUN npm install

# Set NODE_ENV to production
ENV NODE_ENV production

# Copying and building for production
COPY . .
RUN npm run build
RUN npm install http-server -g

# Open 80 port and run nginx as daemon to serve content
EXPOSE 80
CMD ["http-server", "dist", "-p", "8080"]