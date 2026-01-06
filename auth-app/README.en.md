# Authentication Application (auth-app)

## Overview

This is an isolated authentication web application built with React, TypeScript, and Vite. It provides user authentication functionality including login, registration, email verification, password recovery, and user profile management. The application serves as the frontend for user authentication and communicates with a separate backend service.

## Features

- User registration with email verification
- Login and logout functionality
- Password recovery and reset
- User profile management
- Dashboard access for authenticated users
- Chat interface for authenticated users
- API status monitoring
- Multi-language support (i18n)
- Theme support (light/dark mode)
- Protected routes for authenticated users only
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Router**: React Router DOM
- **Styling**: CSS with modular approach
- **State Management**: React Context API
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- Docker and Docker Compose (for containerized deployment)
- Git

## Backend Dependency

**Important**: This authentication application requires a separate backend service to function properly. The backend service should be running on port `8765` and provide the API endpoints under the `/api` path.

The backend service is located in a separate project and must be started independently. The frontend proxies API requests to `http://localhost:8765` during development and to the backend service in production.

## Installation and Setup

### Development Mode

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd auth-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The application will be available at `http://localhost:3000`

5. **Important**: Make sure the backend service is running on `http://localhost:8765` for the authentication features to work properly.

### Production Build

1. Build the application:
   ```bash
   npm run build
   ```

2. The production-ready files will be generated in the `dist` directory.

3. Serve the application using a web server like Nginx or Apache.

### Docker Deployment

1. Build and run the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

2. The application will be available at `http://localhost:3000`

3. **Important**: When using Docker, ensure the backend service is accessible. The Docker configuration includes a reference to a backend service named `backend` in the same Docker network. If the backend is running outside Docker, you may need to adjust the proxy configuration in `nginx.conf`.

## Environment Configuration

The application uses the following ports:

- **Frontend**: Port 3000 (both development and production)
- **Backend API**: Port 8765 (proxied from /api requests)

During development, API requests are automatically proxied from the frontend to the backend service at `http://localhost:8765`.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Lint the codebase
- `npm run lint:fix` - Automatically fix linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Project Structure

```
src/
├── api/                    # API client and request functions
├── components/            # Reusable UI components
├── contexts/              # React Context providers
├── hooks/                 # Custom React hooks
├── i18n/                  # Internationalization files
├── pages/                 # Application pages
├── styles/                # CSS styles and themes
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
├── App.tsx               # Main application component
└── main.tsx              # Application entry point
```

## API Integration

The frontend communicates with the backend through API endpoints under the `/api` path. During development, these requests are proxied to `http://localhost:8765`. In production, the Nginx configuration handles the proxying to the backend service.

## Docker Configuration

The application includes:

- A multi-stage Dockerfile for optimized builds
- Docker Compose configuration for easy deployment
- Nginx configuration for serving static files and API proxying

The Docker setup includes:
- Builder stage with Node.js for building the application
- Production stage with Nginx to serve the built application
- Proxy configuration for API requests to the backend service

## Troubleshooting

### Common Issues

1. **API requests failing**: Ensure the backend service is running on port 8765
2. **CORS errors**: Check that the backend is properly configured to accept requests from the frontend
3. **Docker networking**: When using Docker, ensure the frontend and backend containers can communicate properly

### Development Server

If the development server doesn't start properly:
1. Verify Node.js and npm are installed correctly
2. Clear npm cache: `npm cache clean --force`
3. Delete node_modules and reinstall: `rm -rf node_modules && npm install`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is licensed under the ISC License.