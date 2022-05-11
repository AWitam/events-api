class BaseException extends Error {
  constructor(code, errorMessage) {
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

module.exports = BaseException;
