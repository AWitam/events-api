class BaseException extends Error {
  private code: number;
  private errorMessage: string;

  constructor(code: number, errorMessage: string) {
    super(`${code} - ${errorMessage}`);
    this.code = code;
    this.errorMessage = errorMessage;
  }

  getErrorDetails() {
    return {
      code: this.code,
      message: this.errorMessage,
    };
  }
}

export default BaseException;
