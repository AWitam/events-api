const { validateToken } = require("../services/jwt.service");

async function tokenValidation(ctx, next) {
  const authHeader = ctx.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (token && (await validateToken(token))) {
    return next();
  }
}

module.exports = { tokenValidation };
