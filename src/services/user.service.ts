import { Prisma } from "@prisma/client";
import BaseException from "../exceptions/base.exception";
import InvalidCredentialException from "../exceptions/invalidCredentails.exception";
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
import { RequestContext } from "../interfaces/requestContext.interface";

async function createUser(ctx: RequestContext) {
  const { username, email, password } = ctx.request.body;
  const hashedPassword = await getHashedPassword(password);

  try {
    const { id } = await createUserRecord({ username, email, password: hashedPassword }, ctx);
    return await createToken(id);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new UniqueConstraintViolationException("Username or email is already taken!");
    }
    throw error;
  }
}

async function loginUser(ctx: RequestContext) {
  const { email, password } = ctx.request.body;
  const user = await _getUserRecordByEmail(email, ctx);

  const isValidPassword = user && (await validatePassword(password, user.password));
  if (!isValidPassword) {
    throw new InvalidCredentialException("Invalid Username or Password!");
  }

  return await createToken(user.id);
}

async function getAllUsers(ctx: RequestContext) {
  // todo: add pagination ?
  return await getAllUserRecords(ctx);
}

async function getUserById(ctx: RequestContext) {
  const id = ctx.params.id;
  const user = await getUserRecordById(Number(id), ctx);
  if (!user) {
    throw new NotFoundException("User not found!");
  }

  return user;
}

async function updateUser(ctx: RequestContext) {
  const dataPayload: Prisma.UserUpdateInput = {
    username: ctx.request.body.username,
  };
  const userId = Number(ctx.params.id);

  try {
    return await updateUserRecord(userId, dataPayload, ctx);
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

async function deleteUser(ctx: RequestContext) {
  const id = Number(ctx.params.id);
  const user = await getUserRecordById(id, ctx);
  if (!user) {
    throw new NotFoundException("Cannot delete - no user associated with this id");
  }
  return await deleteUserRecord(id, ctx);
}

export { createUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser };
