import Router from "@koa/router";
import { createUser, loginUser } from "../services/user.service";

const authController = new Router();

authController.post("/register", async (ctx) => {
  ctx.body = await createUser(ctx);
});

authController.post("/login", async (ctx) => {
  ctx.body = await loginUser(ctx);
});

export default authController;
