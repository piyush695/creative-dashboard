# Use Node.js 20 (REQUIRED for Next.js)
FROM node:20-alpine

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build Next.js
RUN npm run build

# Cloud Run port
EXPOSE 3000

# Start app
CMD ["npm", "start"]
