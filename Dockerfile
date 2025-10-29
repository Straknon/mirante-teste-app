FROM node:20-bullseye AS build
WORKDIR /app
RUN apt-get update && apt-get install -y python3 make g++
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --project=mirante-teste-app --configuration=production

FROM nginx:alpine
COPY --from=build /app/dist/mirante-teste-app/browser /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]