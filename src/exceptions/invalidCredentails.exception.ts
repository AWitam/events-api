import BaseException from "./base.exception";

class InvalidCredentialException extends BaseException {
  constructor(errorMessage: string) {
    super(401, errorMessage);
  }
}

export default InvalidCredentialException;
