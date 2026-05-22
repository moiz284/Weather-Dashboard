export class ValidationError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

export class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

export class ExternalServiceError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "ExternalServiceError";
    this.statusCode = 502;
  }
}

export class TimeoutError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "TimeoutError";
    this.statusCode = 504;
  }
}