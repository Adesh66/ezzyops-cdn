import fs from 'fs';
import path from 'path';

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3
}

class Logger {
  private logLevel: LogLevel;
  private logFile?: string;

  constructor() {
    const level = process.env.LOG_LEVEL?.toLowerCase() || 'info';
    this.logLevel = this.getLogLevel(level);
    this.logFile = process.env.LOG_FILE;
    
    // Create logs directory if it doesn't exist
    if (this.logFile) {
      const logDir = path.dirname(this.logFile);
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
    }
  }

  private getLogLevel(level: string): LogLevel {
    switch (level) {
      case 'error': return LogLevel.ERROR;
      case 'warn': return LogLevel.WARN;
      case 'info': return LogLevel.INFO;
      case 'debug': return LogLevel.DEBUG;
      default: return LogLevel.INFO;
    }
  }

  private formatMessage(level: string, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${metaStr}`;
  }

  private log(level: LogLevel, levelName: string, message: string, meta?: any) {
    if (level <= this.logLevel) {
      const formattedMessage = this.formatMessage(levelName, message, meta);
      
      // Console output
      console.log(formattedMessage);
      
      // File output
      if (this.logFile) {
        fs.appendFileSync(this.logFile, formattedMessage + '\n');
      }
    }
  }

  error(message: string, meta?: any) {
    this.log(LogLevel.ERROR, 'error', message, meta);
  }

  warn(message: string, meta?: any) {
    this.log(LogLevel.WARN, 'warn', message, meta);
  }

  info(message: string, meta?: any) {
    this.log(LogLevel.INFO, 'info', message, meta);
  }

  debug(message: string, meta?: any) {
    this.log(LogLevel.DEBUG, 'debug', message, meta);
  }
}

export const logger = new Logger();
