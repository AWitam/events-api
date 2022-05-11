const BaseException = require("../exceptions/base.exception");

function exceptionHandlerMiddleware() {
  return async (ctx, next) => {
    try {
      return await next();
    } catch (error) {
      if (error instanceof BaseException) {
        const { code, message } = error.getErrorDetails();
        ctx.status = Number(code);
        ctx.body = message;
        return;
      }
      ctx.status = 500;
      ctx.body = "Internaaalll";
    }
  };
}

module.exports = exceptionHandlerMiddleware;
