import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.js";

export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  // Log the error with context
  logger.error('Unhandled error', {
    message: err?.message,
    stack: err?.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    body: req.body,
    params: req.params,
    query: req.query
  });

  const status = err?.status || err?.statusCode || 500;
  const message = err?.message || "Internal Server Error";

  // Don't expose internal error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const errorResponse: any = {
    error: message,
    status,
    timestamp: new Date().toISOString(),
    path: req.path
  };

  // Include stack trace only in development
  if (isDevelopment && err?.stack) {
    errorResponse.stack = err.stack;
  }

  // Handle specific error types
  if (err.name === 'ValidationError') {
    errorResponse.details = err.details;
  }

  if (err.code === 'ECONNREFUSED') {
    errorResponse.error = 'Database connection failed';
  }

  res.status(status).json(errorResponse);
}

// 404 handler
export function notFoundHandler(req: Request, res: Response) {
  logger.warn('Route not found', {
    path: req.path,
    method: req.method,
    ip: req.ip
  });

  res.status(404).json({
    error: 'Route not found',
    status: 404,
    timestamp: new Date().toISOString(),
    path: req.path
  });
}
