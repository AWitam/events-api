import { Prisma } from "@prisma/client";
import BaseException from "../exceptions/base.exception";
import InvalidCredentailException from "../exceptions/invalidCredentails.exception";
import NotFoundException from "../exceptions/notFound.exception";
import UniqueConstraintViolationException from "../exceptions/uniqueConstraintViolation.exception";
import {
  createUserRecord,
  _getUserRecordByEmail,
  getAllUserRecords,
  getUserRecordById,
  updateUserRecord,
  deleteUserRecord,
} from "../repositories/user.repository";
import { getHashedPassword, validatePassword } from "../utils/password.util";
import { createToken } from "./jwt.service";
import { Context } from "koa";

async function createUser(ctx: Context) {
  const { username, email, password } = ctx.request.body;
  const hashedPassword = await getHashedPassword(password);

  try {
    const { id } = await createUserRecord({ username, email, password: hashedPassword });
    return await createToken(id);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new UniqueConstraintViolationException("Username or email is already taken!");
    }
    throw error;
  }
}

async function loginUser(ctx: Context) {
  const { email, password } = ctx.request.body;
  const user = await _getUserRecordByEmail(email);

  const isValidPassword = user && (await validatePassword(password, user.password));
  if (!isValidPassword) {
    throw new InvalidCredentailException("Invalid Username or Password!");
  }

  return await createToken(user.id);
}

async function getAllUsers() {
  // todo: add pagination ?
  return await getAllUserRecords();
}

async function getUserById(ctx: Context) {
  const id = ctx.params.id;
  const user = await getUserRecordById(Number(id));
  if (!user) {
    throw new NotFoundException("User not found!");
  }

  return user;
}

async function updateUser(ctx: Context) {
  const dataPayload = {
    id: Number(ctx.params.id),
    newUsername: ctx.request.body.newUsername,
  };

  try {
    return await updateUserRecord(dataPayload);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new UniqueConstraintViolationException("Username is taken!");
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new NotFoundException("Cannot update - no user associated with this id!");
    }

    if (error instanceof Error) {
      throw new BaseException(500, error.message);
    }
  }
}

async function deleteUser(ctx: Context) {
  const id = ctx.params.id;
  const user = await getUserRecordById(Number(id));
  if (!user) {
    throw new NotFoundException("Cannot delete - no user associated with this id");
  }
  return await deleteUserRecord(Number(id));
}

export { createUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser };
