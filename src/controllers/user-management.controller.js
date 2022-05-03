const { v4: uuidv4 } = require("uuid");

const Router = require("@koa/router");
const {
  tokenValidation,
} = require("../middlewares/tokenValidation.middleware");
const { createToken } = require("../services/jwt.service");

const userManagementController = new Router();

userManagementController.post("/register", async (ctx) => {
  const userId = uuidv4();
  const token = await createToken(userId);
  ctx.body = { token };
});

userManagementController.post("/login", (ctx) => {});

userManagementController.post("/validate", tokenValidation, (ctx) => {
  ctx.body = "validated";
});

module.exports = userManagementController;
