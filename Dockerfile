FROM node:20.9.0-alpine3.18 AS build
WORKDIR /app

ARG VITE_API
ARG VITE_KD_ROOT
ARG VITE_API_KD

ENV VITE_API=$VITE_API
ENV VITE_KD_ROOT=$VITE_KD_ROOT
ENV VITE_API_KD=$VITE_API_KD

COPY . .
RUN npm i && npm run build

FROM nginx:1.25.2
COPY --from=build /app/dist /etc/nginx/app/
COPY nginx.conf /etc/nginx/conf.d/app.conf
EXPOSE 3000
CMD ["sh", "-c", "cd /etc/nginx/app/ && nginx -g 'daemon off;'"]
