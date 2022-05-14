const InvalidCredentailException = require("../exceptions/invalidCredentails.exception");
const NotFoundException = require("../exceptions/notFound.exception");
const {
  createUserRecord,
  _getUserRecordByEmail,
  getAllUserRecords,
  getUserRecordById,
  updateUserRecord,
  deleteUserRecord,
} = require("../repositories/user.repository");
const { getHashedPassword, validatePassword } = require("../utils/password.util");
const { createToken } = require("./jwt.service");

async function createUser(ctx) {
  const { username, email, password } = ctx.request.body;
  const hashedPassword = await getHashedPassword(password);
  const userId = await createUserRecord({ username, email, password: hashedPassword });
  return await createToken(userId);
}

async function loginUser(ctx) {
  const { email, password } = ctx.request.body;
  const user = await _getUserRecordByEmail(email);
  if (!user) {
    throw new InvalidCredentailException("Invalid email!");
  }

  const isValidPassword = await validatePassword(password, user.password);
  if (!isValidPassword) {
    throw new InvalidCredentailException("Wrong password!");
  }

  return await createToken(user.id);
}

async function getAllUsers(ctx) {
  // todo: add pagination ?
  return await getAllUserRecords(ctx);
}

async function getUserById(ctx) {
  const id = ctx.request.params.id;
  const user = await getUserRecordById(Number(id));
  if (!user) {
    throw new NotFoundException("User not found!");
  }
  return user;
}

async function updateUser(ctx) {
  const dataPayload = {
    id: Number(ctx.request.params.id),
    newUsername: ctx.request.body.newUsername,
  };

  return await updateUserRecord(dataPayload);
}

async function deleteUser(ctx) {
  const id = ctx.request.params.id;
  const user = await getUserRecordById(Number(id));
  if (!user) {
    throw new NotFoundException("Cannot delete - no user associated with this id");
  }
  return await deleteUserRecord(Number(id));
}

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
