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

# Nginx
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf

# Open 80 port and run nginx as daemon to serve content
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
