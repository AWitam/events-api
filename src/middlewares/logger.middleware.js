const { v4: uuidv4 } = require("uuid");
const logger = require("../utils/logger.util");

function loggerMiddleware() {
  return (ctx, next) => {
    const requestId = uuidv4();
    ctx.state.logger = logger.child({ requestId });
    ctx.set("X-Request-Id", requestId);
    return next();
  };
}

module.exports = loggerMiddleware;
