import BaseException from "../exceptions/base.exception";
import { Context, Next } from "koa";

function exceptionHandlerMiddleware() {
  return async (ctx: Context, next: Next) => {
    try {
      return await next();
    } catch (error) {
      const { logger } = ctx.state;

      const log = logger || console;
      // @ts-ignore
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
export default exceptionHandlerMiddleware;
