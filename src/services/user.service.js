const InvalidCredentailException = require("../exceptions/invalidCredentails.exception");
const { createUserRecord, getUserRecord } = require("../repositories/user.repository");
const { getHashedPassword, validatePassword } = require("../utils/password.util");
const { createToken } = require("./jwt.service");

async function createUser(ctx) {
  // TODO: check and exception if there's no required data on request body, check if email is unique
  const { username, email, password } = ctx.request.body;
  const hashedPassword = await getHashedPassword(password);
  const userId = await createUserRecord({ username, email, password: hashedPassword });
  return await createToken(userId);
}

async function loginUser(ctx) {
  const { email, password } = ctx.request.body;
  const user = await getUserRecord(email);
  if (!user) {
    throw new InvalidCredentailException("Invalid email!");
  }

  const isValidPassword = await validatePassword(password, user.password);
  if (!isValidPassword) {
    throw new InvalidCredentailException("Wrong password!");
  }

  return await createToken(user.id);
}

module.exports = {
  createUser,
  loginUser,
};
