const BaseException = require("./base.exception");

class UniqueConstraintViolationException extends BaseException {
  constructor(errorMessage) {
    super(400, errorMessage);
  }
}

module.exports = UniqueConstraintViolationException;
