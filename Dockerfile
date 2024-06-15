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
EXPOSE 5000

# Start the application
CMD ["npm", "run", "start"]