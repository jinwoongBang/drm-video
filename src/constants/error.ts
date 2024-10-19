export class SpoonError implements Error {
  code: string;
  name: string;
  message: string;

  constructor({ code, message }: { code: string; message: string }) {
    this.name = this.constructor.name;
    this.code = code;
    this.message = message;
  }
}

export class NetworkError extends SpoonError {
  constructor(message: string) {
    super({ code: "NETWORK_ERROR", message });
  }
}
export class TimeoutError extends SpoonError {
  constructor(message: string) {
    super({ code: "TIMEOUT_ERROR", message });
  }
}
export class InternalServerError extends SpoonError {
  constructor(message: string) {
    super({ code: "INTERNAL_SERVER_ERROR", message });
  }
}

export class UnknownError extends SpoonError {
  constructor(message: string) {
    super({ code: "UNKNOWN_ERROR", message });
  }
}

export class ShakaError
  extends SpoonError
  implements Omit<shaka.util.Error, "noStructuralTyping_shaka_util_Error">
{
  code: any;
  name: string;
  message: string;
  data: any;
  handled: any;

  category: any;
  severity: any;

  stack?: string | undefined;
  cause?: unknown;

  constructor(error: shaka.util.Error) {
    super({ code: error.code, message: error.message });
    console.error(error);

    this.name = error.name;
    this.message = error.message;
    this.category = error.category;
    this.severity = error.severity;
    this.stack = error.stack;
    this.cause = error.cause;
  }
}
