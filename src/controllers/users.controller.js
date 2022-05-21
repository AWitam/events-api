const Router = require("@koa/router");
const { getAllUsers, getUserById, updateUser, deleteUser } = require("../services/user.service");

const userController = new Router();

userController.get("/users", async (ctx) => {
  ctx.body = await getAllUsers(ctx);
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

module.exports = userController;
