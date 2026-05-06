# First stage: build the React application
# Uses lightweight Node.js Alpine image
FROM node:20-alpine AS build

# Set working directory inside container
WORKDIR /app

# Copy package.json first
COPY package.json .

# Install project dependencies
RUN npm install

# Copy all frontend source files
COPY . .

# Build production React app
RUN npm run build

# Second stage: serve app using Nginx
FROM nginx:alpine

# Copy built frontend files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for HTTP traffic
EXPOSE 80