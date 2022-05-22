import BaseException from "./base.exception";

class NotFoundException extends BaseException {
  constructor(errorMessage: string) {
    super(404, errorMessage);
  }
}

export default NotFoundException;
