# Makefile for Brave Monkey Web Site (auth-app)

.PHONY: up down restart build logs deploy help

# Show help
help:
	@echo "Brave Monkey Web Site Makefile"
	@echo "=============================="
	@echo "Available commands:"
	@echo "  make up      - Start the website in Docker"
	@echo "  make down    - Stop the website"
	@echo "  make restart - Restart the website"
	@echo "  make build   - Rebuild the Docker image"
	@echo "  make logs    - View container logs"
	@echo "  make deploy  - Build and push image to GHCR"

# Start the website
up:
	@echo "🚀 Starting web site..."
	docker compose up -d

# Stop the website
down:
	@echo "🛑 Stopping web site..."
	docker compose down

# Restart the website
restart: down up

# Build the image
build:
	@echo "🔨 Building web site image..."
	docker compose build

# View logs
logs:
	docker compose logs -f web_site

# Deploy to GHCR
deploy:
	@echo "📦 Deploying to GitHub Packages..."
	./deploy.sh
