# Use lightweight Node.js image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json file
COPY package.json .

# Install backend dependencies
RUN npm install

# Copy all backend source files
COPY . .

# Backend server runs on port 5000
EXPOSE 5000

# Start the Node.js backend application
CMD ["npm", "start"]