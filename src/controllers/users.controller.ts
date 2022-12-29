import Router from "@koa/router";
import { RequestContext, RequestState } from "../interfaces/requestContext.interface";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../services/user.service";

const userController = new Router<RequestState>();

userController.get("/users", async (ctx: RequestContext) => {
  ctx.body = await getAllUsers(ctx);
});

userController.get("/users/:id", async (ctx: RequestContext) => {
  ctx.body = await getUserById(ctx);
});

userController.put("/users/:id", async (ctx: RequestContext) => {
  ctx.body = await updateUser(ctx);
});

userController.delete("/users/:id", async (ctx: RequestContext) => {
  ctx.body = await deleteUser(ctx);
});

export default userController;
