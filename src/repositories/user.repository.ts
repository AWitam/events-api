import { Prisma } from "@prisma/client";
import { db } from "../utils/db.util";

const userSelect: Prisma.UserSelect = {
  id: true,
  email: true,
  username: true,
};

async function createUserRecord(userData: Prisma.UserCreateInput) {
  return await db.user.create({
    data: userData,
    select: {
      id: true,
    },
  });
}

async function _getUserRecordByEmail(email: string) {
  return await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      password: true,
    },
  });
}

async function getUserRecordById(id: number) {
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
    select: userSelect,
  });
  return user;
}

async function getAllUserRecords() {
  return await db.user.findMany({
    select: userSelect,
  });
}

async function updateUserRecord({ id, newUsername }: { id: number; newUsername: string }) {
  // todo: add two step email and password update... someday :)

  return await db.user.update({
    where: {
      id,
    },
    data: {
      username: newUsername,
    },
    select: userSelect,
  });
}

async function deleteUserRecord(id: number) {
  await db.user.delete({
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
