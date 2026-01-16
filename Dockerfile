# Use Node.js LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Build Next.js app
RUN npm run build

# Expose port Cloud Run expects
EXPOSE 3000

# Start app
CMD ["npm", "start"]
