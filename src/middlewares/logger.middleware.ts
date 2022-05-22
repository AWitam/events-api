import { v4 as uuidv4 } from "uuid";
import { logger } from "../utils/logger.util";
import { Context, Next } from "koa";

function loggerMiddleware() {
  return (ctx: Context, next: Next) => {
    const requestId = uuidv4();
    ctx.state.logger = logger.child({ requestId });
    ctx.set("X-Request-Id", requestId);
    return next();
  };
}

export default loggerMiddleware;
