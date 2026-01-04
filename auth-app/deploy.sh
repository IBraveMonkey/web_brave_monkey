#!/bin/bash

# Configuration
USERNAME="ibravemonkey"
IMAGE_NAME="brave-monkey-web-site"
REGISTRY="ghcr.io"

# Use first argument as version, default to 'latest'
VERSION="${1:-latest}"

FULL_IMAGE_NAME="$REGISTRY/$USERNAME/$IMAGE_NAME:$VERSION"


echo "📦 Checking and zipping artifacts..."
if [ -d "public/macOs" ]; then
    echo "  - Zipping macOS artifacts..."
    (cd public && zip -r -9 macOs.zip macOs > /dev/null)
fi

if [ -d "public/win" ]; then
    echo "  - Zipping Windows artifacts..."
    (cd public && zip -r -9 win.zip win > /dev/null)
fi

echo "🚀 Building Docker image: $FULL_IMAGE_NAME..."
# Build the image using the multi-stage Dockerfile
docker build -t "$FULL_IMAGE_NAME" .

echo "✅ Build complete. Pushing to GitHub Packages..."
# Push the image (user must be logged in with: docker login ghcr.io -u IBraveMonkey)
docker push "$FULL_IMAGE_NAME"

echo "✨ Done! Image is now available at: https://github.com/$USERNAME/$IMAGE_NAME/packages"
echo "To run this image elsewhere:"
echo "docker run -p 3000:3000 $FULL_IMAGE_NAME"
