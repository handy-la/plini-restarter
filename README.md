# Build Docker image
docker build -t plini-restarter .

# Run Docker container
docker run -p 3001:3001 -d plini-restarter
