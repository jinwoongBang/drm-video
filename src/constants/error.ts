export class SpoonError implements Error {
  name: string;
  message: string;

  constructor(message: string) {
    this.name = this.constructor.name;
    this.message = message;
  }
}

export class NetworkError extends SpoonError {
  constructor(message: string) {
    super(message);
  }
}
export class TimeoutError extends SpoonError {
  constructor(message: string) {
    super(message);
  }
}
export class InternalServerError extends SpoonError {
  constructor(message: string) {
    super(message);
  }
}
