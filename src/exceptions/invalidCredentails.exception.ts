import BaseException from "./base.exception";

class InvalidCredentailException extends BaseException {
  constructor(errorMessage: string) {
    super(401, errorMessage);
  }
}

export default InvalidCredentailException;
