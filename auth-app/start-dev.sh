#!/bin/bash

# Start the backend server in the background
npx tsx server/server.ts &
BACKEND_PID=$!

# Start the frontend server in the background
npm run client &
FRONTEND_PID=$!

# Function to handle script exit
cleanup() {
    echo "Shutting down servers..."
    kill $BACKEND_PID $FRONTEND_PID
    exit 0
}

# Trap exit signals
trap cleanup INT TERM

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID