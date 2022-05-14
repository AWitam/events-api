const { Prisma } = require("@prisma/client");
const NotFoundException = require("../exceptions/notFound.exception");
const UniqueConstraintViolationException = require("../exceptions/uniqueConstraintViolation.exception");

const { db } = require("../utils/db.util");

const userSelect = {
  id: true,
  email: true,
  username: true,
};

async function createUserRecord(userData) {
  try {
    return await db.user.create({
      data: userData,
      select: {
        id: true,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      throw new UniqueConstraintViolationException("User already exists!");
    }
  }
}

async function _getUserRecordByEmail(email) {
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

async function getUserRecordById(id) {
  return await db.user.findUnique({
    where: {
      id: id,
    },
    select: userSelect,
  });
}

async function getAllUserRecords() {
  return await db.user.findMany({
    select: userSelect,
  });
}

async function updateUserRecord(dataPayload) {
  const { id, newUsername } = dataPayload;
  // todo: add two step email and password update... someday :)
  try {
    return await db.user.update({
      where: {
        id,
      },
      data: {
        username: newUsername,
      },
      select: userSelect,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      throw new UniqueConstraintViolationException("Username is taken!");
    }
  }
}

async function deleteUserRecord(id) {
  await db.user.delete({
    where: {
      id,
    },
  });
}

module.exports = {
  createUserRecord,
  _getUserRecordByEmail,
  getAllUserRecords,
  getUserRecordById,
  updateUserRecord,
  deleteUserRecord,
};
