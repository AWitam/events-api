const BaseException = require("./base.exception");

class UserAlreadyExistsException extends BaseException {
  constructor() {
    super(400, "User already exists!");
  }
}

module.exports = UserAlreadyExistsException;
