const { Prisma } = require("@prisma/client");
const BaseException = require("../exceptions/base.exception");
const InvalidCredentailException = require("../exceptions/invalidCredentails.exception");
const NotFoundException = require("../exceptions/notFound.exception");
const UniqueConstraintViolationException = require("../exceptions/uniqueConstraintViolation.exception");
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

  try {
    const userId = await createUserRecord({ username, email, password: hashedPassword });
    return await createToken(userId);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new UniqueConstraintViolationException("Username or email is already taken!");
    }
  }
}

async function loginUser(ctx) {
  const { email, password } = ctx.request.body;
  const user = await _getUserRecordByEmail(email);

  const isValidPassword = user && (await validatePassword(password, user.password));
  if (!isValidPassword) {
    throw new InvalidCredentailException("Invalid Username or Password!");
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
  try {
    return await updateUserRecord(dataPayload);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new UniqueConstraintViolationException("Username is taken!");
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      throw new NotFoundException("Cannot update - no user associated with this id!");
    }

    throw new BaseException(500, error.message);
  }
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
