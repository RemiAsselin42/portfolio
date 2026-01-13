/**
 * Centralized logging utility
 * Enables consistent error handling and monitoring across the app
 * Production-ready with history tracking and external service integration support
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: string;
}

/**
 * Logger singleton class for centralized application logging
 * @example
 * ```typescript
 * logger.info("User logged in", { userId: 123 });
 * logger.error("API call failed", error);
 * ```
 */
class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 100;

  /**
   * Generates ISO timestamp for log entries
   * @returns ISO format timestamp string
   */
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  /**
   * Adds log entry to history with circular buffer behavior
   * @param entry - Log entry to store
   */
  private addToHistory(entry: LogEntry): void {
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }

  /**
   * Logs debug-level information (development only)
   * @param message - Human-readable log message
   * @param data - Optional additional context data
   */
  debug(message: string, data?: unknown): void {
    const entry: LogEntry = {
      level: "debug",
      message,
      data,
      timestamp: this.getTimestamp(),
    };
    this.addToHistory(entry);
    if (import.meta.env.DEV) {
      console.debug(`[DEBUG] ${message}`, data || "");
    }
  }

  /**
   * Logs informational messages
   * @param message - Human-readable log message
   * @param data - Optional additional context data
   */
  info(message: string, data?: unknown): void {
    const entry: LogEntry = {
      level: "info",
      message,
      data,
      timestamp: this.getTimestamp(),
    };
    this.addToHistory(entry);
    console.info(`[INFO] ${message}`, data || "");
  }

  /**
   * Logs warning messages for non-critical issues
   * @param message - Human-readable warning message
   * @param data - Optional additional context data
   */
  warn(message: string, data?: unknown): void {
    const entry: LogEntry = {
      level: "warn",
      message,
      data,
      timestamp: this.getTimestamp(),
    };
    this.addToHistory(entry);
    console.warn(`[WARN] ${message}`, data || "");
  }

  /**
   * Logs error messages with optional error object
   * @param message - Human-readable error description
   * @param error - Error object or additional context
   */
  error(message: string, error?: unknown): void {
    const entry: LogEntry = {
      level: "error",
      message,
      data: error,
      timestamp: this.getTimestamp(),
    };
    this.addToHistory(entry);
    console.error(`[ERROR] ${message}`, error || "");

    // TODO: Send to monitoring service (Sentry, LogRocket, etc.) in production
    // if (import.meta.env.PROD && window.Sentry) {
    //   window.Sentry.captureException(error, { extra: { message } });
    // }
  }

  /**
   * Retrieves all stored log entries
   * @returns Copy of log history array
   */
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  /**
   * Clears all stored log history
   */
  clearLogs(): void {
    this.logs = [];
  }
}

export const logger = new Logger();
