import { Prisma } from "@prisma/client";
import { RequestContext } from "../interfaces/requestContext.interface";

const userSelect: Prisma.UserSelect = {
  id: true,
  email: true,
  username: true,
};

async function createUserRecord(userData: Prisma.UserCreateInput, ctx: RequestContext) {
  return await ctx.state.db.user.create({
    data: userData,
    select: {
      id: true,
    },
  });
}

async function _getUserRecordByEmail(email: string, ctx: RequestContext) {
  return await ctx.db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      password: true,
    },
  });
}

async function getUserRecordById(id: number, ctx: RequestContext) {
  const user = await ctx.state.db.user.findUnique({
    where: {
      id: id,
    },
    select: userSelect,
  });
  return user;
}

async function getAllUserRecords(ctx: RequestContext) {
  return await ctx.state.db.user.findMany({
    select: userSelect,
  });
}

async function updateUserRecord(userId: number, data: Prisma.UserUpdateInput, ctx: RequestContext) {
  const { id, newUsername } = ctx.request.body;

  return await ctx.state.db.user.update({
    where: {
      id: userId,
    },
    data,
    select: userSelect,
  });
}

async function deleteUserRecord(id: number, ctx: RequestContext) {
  await ctx.state.db.user.delete({
    where: {
      id,
    },
  });
}

export {
  createUserRecord,
  _getUserRecordByEmail,
  getAllUserRecords,
  getUserRecordById,
  updateUserRecord,
  deleteUserRecord,
};
