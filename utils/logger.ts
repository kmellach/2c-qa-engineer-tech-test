export enum LogLevel {
  INFO = "INFO",
  ERROR = "ERROR",
  DEBUG = "DEBUG"
}

export class Logger {
  static info(message: string, data?: unknown) {
    console.log(`[INFO] ${message}`, data ?? "");
  }

  static error(message: string, data?: unknown) {
    console.error(`[ERROR] ${message}`, data ?? "");
  }

  static debug(message: string, data?: unknown) {
    if (process.env.DEBUG) {
      console.debug(`[DEBUG] ${message}`, data ?? "");
    }
  }
}