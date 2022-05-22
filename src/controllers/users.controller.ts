import Router from "@koa/router";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../services/user.service";

const userController = new Router();

userController.get("/users", async (ctx) => {
  ctx.body = await getAllUsers();
});

userController.get("/users/:id", async (ctx) => {
  ctx.body = await getUserById(ctx);
});

userController.put("/users/:id", async (ctx) => {
  ctx.body = await updateUser(ctx);
});

userController.delete("/users/:id", async (ctx) => {
  ctx.body = await deleteUser(ctx);
});

export default userController;
