const Router = require("@koa/router");
const { tokenValidation } = require("../middlewares/tokenValidation.middleware");
const { db } = require("../utils/db.util");
const { createUser, loginUser } = require("../services/user.service");

const userManagementController = new Router();

userManagementController.post("/register", async (ctx) => {
  ctx.body = await createUser(ctx);
});

userManagementController.post("/login", async (ctx) => {
  ctx.body = await loginUser(ctx);
});

userManagementController.post("/validate", tokenValidation, async (ctx) => {
  const allUsers = await db.user.findMany();

  ctx.body = allUsers;
});

module.exports = userManagementController;
