const BaseException = require("./base.exception");

class InvalidCredentailException extends BaseException {
  constructor(errorMessage) {
    super(401, errorMessage);
  }
}

module.exports = InvalidCredentailException;
