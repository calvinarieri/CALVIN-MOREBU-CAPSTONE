FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

FROM nginx:1.27-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist /usr/share/nginx/html

RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup && \
    mkdir -p /tmp/nginx && \
    chown -R appuser:appgroup \
        /usr/share/nginx/html \
        /var/cache/nginx \
        /etc/nginx \
        /tmp/nginx

USER appuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]