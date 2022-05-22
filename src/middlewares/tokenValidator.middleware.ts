import { validateToken } from "../services/jwt.service";
import { Context, Next } from "koa";

async function tokenValidator(ctx: Context, next: Next) {
  const authHeader = ctx.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token && (await validateToken(token))) {
    return next();
  }
}

export default tokenValidator;
