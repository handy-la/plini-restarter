# Use an official lightweight Node.js 14 image.
# https://hub.docker.com/_/node
FROM node:14-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json or yarn.lock (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy local code to the container image.
COPY . .

# Make port available to the world outside this container
EXPOSE 3001

# Run the web service on container startup.
CMD [ "node", "app.js" ]
