import BaseException from "./base.exception";

class UniqueConstraintViolationException extends BaseException {
  constructor(errorMessage: string) {
    super(400, errorMessage);
  }
}

export default UniqueConstraintViolationException;
