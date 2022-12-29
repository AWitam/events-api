import { Next } from "koa";
import { RequestContext } from "../interfaces/requestContext.interface";
import { db } from "../utils/db.util";

function dbConnectionMiddleware() {
  return (ctx: RequestContext, next: Next) => {
    ctx.state.db = db
    return next();
  }
}

export {dbConnectionMiddleware}