import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import compression from "compression";

import hotelRoutes from "./routes/hotelRoutes.js";
import guestRoutes from "./routes/guestRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import { createRateLimiter, securityHeaders, requestLogger, corsOptions } from "./middlewares/security.js";
import { logger } from "./utils/logger.js";

// Load environment variables
dotenv.config();

const app = express();

// Trust proxy for accurate IP addresses
app.set('trust proxy', 1);

// Security middleware
app.use(securityHeaders);
app.use(createRateLimiter());

// CORS configuration
app.use(cors(corsOptions));

// Request logging
app.use(requestLogger);

// Body parsing and compression
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get("/health", (_req, res) => {
  res.json({ 
    ok: true, 
    timestamp: new Date().toISOString(),
    version: process.env.API_VERSION || 'v1',
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
const apiVersion = process.env.API_VERSION || 'v1';
app.use(`/api/${apiVersion}/hotels`, hotelRoutes);
app.use(`/api/${apiVersion}/hotels`, guestRoutes);
app.use(`/api/${apiVersion}/hotels`, staffRoutes);
app.use(`/api/${apiVersion}/hotels`, serviceRoutes);
app.use(`/api/${apiVersion}/hotels`, orderRoutes);

// 404 handler for undefined routes
app.use('*', notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`API Version: ${apiVersion}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', { error: error.message, stack: error.stack });
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection', { reason, promise });
  process.exit(1);
});
