FROM node:latest as build
WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/mybsnu-frontend /usr/share/nginx/html
