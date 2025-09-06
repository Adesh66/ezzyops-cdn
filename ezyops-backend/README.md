# EzyOps Backend

A robust Node.js backend service built with TypeScript, Express, and Firebase Firestore to support 4 hotel management applications.

## Features

- **TypeScript**: Full type safety and modern JavaScript features
- **Express.js**: Fast, unopinionated web framework
- **Firebase Firestore**: NoSQL cloud database
- **Security**: Rate limiting, CORS, security headers with Helmet
- **Logging**: Structured logging with file and console output
- **Validation**: Request validation with express-validator
- **Error Handling**: Comprehensive error handling and logging
- **Health Checks**: Database and application health monitoring
- **Compression**: Response compression for better performance

## Project Structure

```
src/
├── config/          # Configuration files
│   ├── firebase.ts  # Firebase/Firestore setup
│   └── database.ts  # Database connection management
├── controllers/     # Route controllers
├── middlewares/     # Express middlewares
│   ├── auth.ts      # Authentication middleware
│   ├── errorHandler.ts # Error handling
│   ├── security.ts  # Security middlewares
│   └── validation.ts # Validation helpers
├── models/          # Data models and interfaces
├── routes/          # API routes
├── services/        # Business logic services
├── utils/           # Utility functions
│   ├── logger.ts    # Logging utility
│   └── firestore.ts # Firestore helper classes
└── validators/      # Request validators
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase project with Firestore enabled

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Adesh66/ezyops.git
cd ezyops-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file with your Firebase credentials:
```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"

# Authentication
REQUIRE_AUTH=false
JWT_SECRET=your-jwt-secret-key

# API Configuration
API_VERSION=v1
CORS_ORIGIN=*

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log
```

### Development

Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:4000` (or your configured PORT).

### Production

Build and start the production server:
```bash
npm run build
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Application health status

### Hotels API
- `GET /api/v1/hotels` - Get all hotels
- `POST /api/v1/hotels` - Create a new hotel
- `GET /api/v1/hotels/:hotelId` - Get hotel by ID
- `PUT /api/v1/hotels/:hotelId` - Update hotel
- `DELETE /api/v1/hotels/:hotelId` - Delete hotel

### Guests API
- Hotel-specific guest management endpoints

### Staff API
- Hotel staff management endpoints

### Services API
- Hotel services management endpoints

### Orders API
- Order management endpoints

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 4000 |
| `NODE_ENV` | Environment (development/production) | development |
| `FIREBASE_PROJECT_ID` | Firebase project ID | - |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account email | - |
| `FIREBASE_PRIVATE_KEY` | Firebase service account private key | - |
| `REQUIRE_AUTH` | Enable authentication | false |
| `JWT_SECRET` | JWT secret key | - |
| `API_VERSION` | API version | v1 |
| `CORS_ORIGIN` | CORS allowed origins | * |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | 900000 |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |
| `LOG_LEVEL` | Logging level | info |
| `LOG_FILE` | Log file path | logs/app.log |

## Security Features

- **Rate Limiting**: Prevents abuse with configurable limits
- **CORS**: Cross-origin resource sharing protection
- **Helmet**: Security headers for common vulnerabilities
- **Input Validation**: Request validation and sanitization
- **Authentication**: Firebase Auth integration (optional)
- **Error Handling**: Secure error responses without sensitive data exposure

## Logging

The application uses structured logging with different levels:
- `error`: Error conditions
- `warn`: Warning conditions
- `info`: Informational messages
- `debug`: Debug-level messages

Logs are output to both console and file (if configured).

## Database

Uses Firebase Firestore as the primary database with:
- Connection management and health checks
- Utility classes for common operations
- Batch operations support
- Error handling and logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is private and proprietary.
