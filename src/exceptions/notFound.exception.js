const BaseException = require("./base.exception");

class NotFoundException extends BaseException {
  constructor(errorMessage) {
    super(404, errorMessage);
  }
}

module.exports = NotFoundException;
