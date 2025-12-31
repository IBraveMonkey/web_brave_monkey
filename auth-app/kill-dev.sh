#!/bin/bash

# Kill all processes related to the auth app
pkill -f "tsx server/server.ts" 2>/dev/null
pkill -f "vite" 2>/dev/null
pkill -f "nodemon" 2>/dev/null
pkill -f "concurrently" 2>/dev/null

echo "All auth app processes have been terminated."