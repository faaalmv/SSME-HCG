import * as Sentry from "@sentry/react";

class Logger {
  info(...args: any[]) {
    console.info(...args);
  }

  warn(...args: any[]) {
    console.warn(...args);
  }

  error(error: Error, context?: Record<string, any>) {
    console.error(error, context);
    if (import.meta.env.PROD) {
      Sentry.captureException(error, { extra: context });
    }
  }
}

export const logger = new Logger();
