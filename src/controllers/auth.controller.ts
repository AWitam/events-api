import Router from "@koa/router";
import { RequestContext, RequestState } from "../interfaces/requestContext.interface";
import { createUser, loginUser } from "../services/user.service";

const authController = new Router<RequestState>();

authController.post("/register", async (ctx: RequestContext) => {
  ctx.body = await createUser(ctx);
});

authController.post("/login", async (ctx: RequestContext) => {
  ctx.body = await loginUser(ctx);
});

export default authController;
