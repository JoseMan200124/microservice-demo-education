# Dockerfile
FROM node:18.18.0

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose the port the app runs on
EXPOSE 3001

# Command to run the app
CMD ["node", "dist/index.js"]
