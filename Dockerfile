FROM node:21.7.3-alpine3.18

# Create and set working directory
RUN mkdir -p /opt/app
WORKDIR /opt/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your application will run on
EXPOSE 8080

# Set environment variables (will be overridden by GitHub Actions)
ENV GOOGLE_CLOUD_KEYFILE=""
ENV FIREBASE_DATABASE_URL=""
ENV KEY_JWT=""

# Start the application
CMD ["npm", "run", "start"]