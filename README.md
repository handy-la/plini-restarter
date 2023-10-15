# Build Docker image
docker build -t my-nodejs-app .

# Run Docker container
docker run -p 3001:3001 -d my-nodejs-app
