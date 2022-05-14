const BaseException = require("../exceptions/base.exception");

function exceptionHandlerMiddleware() {
  return async (ctx, next) => {
    try {
      return await next();
    } catch (error) {
      const { logger } = ctx.state;

      const log = logger || console;
      log.error(error.message);
      if (error instanceof BaseException) {
        const { code, message } = error.getErrorDetails();
        ctx.status = Number(code);
        ctx.body = message;
        return;
      }
      ctx.status = 500;
      ctx.body = "Internal Server Error";
    }
  };
}

module.exports = exceptionHandlerMiddleware;
