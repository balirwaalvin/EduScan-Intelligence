#!/bin/bash

# EduScan Deployment Script for DigitalOcean Droplet
# This script automates the deployment process

echo "🚀 Starting EduScan Deployment..."

# Configuration
REPO_DIR="/opt/EduScan"
DOCKER_IMAGE="eduscan:latest"
CONTAINER_NAME="eduscan"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "Please run as root (use sudo)"
    exit 1
fi

# Navigate to repository
cd $REPO_DIR || {
    print_error "Repository directory not found at $REPO_DIR"
    exit 1
}

print_status "Repository directory found"

# Pull latest changes
print_status "Pulling latest changes from GitHub..."
git pull origin main || {
    print_error "Failed to pull from GitHub"
    exit 1
}

print_status "Code updated successfully"

# Stop existing container
print_status "Stopping existing container..."
docker stop $CONTAINER_NAME 2>/dev/null || print_warning "No container to stop"
docker rm $CONTAINER_NAME 2>/dev/null || print_warning "No container to remove"

print_status "Old container removed"

# Build new image
print_status "Building new Docker image..."
docker build -t $DOCKER_IMAGE . || {
    print_error "Docker build failed"
    exit 1
}

print_status "Docker image built successfully"

# Run new container
print_status "Starting new container..."
docker run -d \
    --name $CONTAINER_NAME \
    --restart unless-stopped \
    -p 3000:3000 \
    --env-file .env.production \
    $DOCKER_IMAGE || {
    print_error "Failed to start container"
    exit 1
}

print_status "Container started successfully"

# Wait for container to be healthy
print_status "Waiting for application to be ready..."
sleep 10

# Check if container is running
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    print_status "Container is running"

    # Show container logs (last 20 lines)
    print_status "Recent logs:"
    docker logs --tail 20 $CONTAINER_NAME

    print_status "🎉 Deployment completed successfully!"
    print_status "Application is running at http://localhost:3000"
else
    print_error "Container failed to start"
    print_error "Checking logs..."
    docker logs $CONTAINER_NAME
    exit 1
fi

# Cleanup old images
print_status "Cleaning up old Docker images..."
docker image prune -f

print_status "Deployment completed at $(date)"
