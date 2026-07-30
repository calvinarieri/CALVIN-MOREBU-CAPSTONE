
# Build Stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build



# Production Stage
FROM nginx:1.27-alpine

# Remove default content
RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production build
COPY --from=builder /app/dist /usr/share/nginx/html

# Create non-root user
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup

# Give ownership
RUN chown -R appuser:appgroup \
    /usr/share/nginx/html \
    /var/cache/nginx \
    /var/run \
    /etc/nginx

USER appuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]