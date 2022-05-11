const { Prisma } = require("@prisma/client");
const UserAlreadyExistsException = require("../exceptions/userAlreadyExsists.exception");
const { db } = require("../utils/db.util");

async function createUserRecord(userData) {
  try {
    return await db.user.create({
      data: userData,
      select: {
        id: true,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw new UserAlreadyExistsException();
      }
    }
  }
}

async function getUserRecord(email) {
  return await db.user.findUnique({
    where: {
      email,
    },
  });
}

module.exports = {
  createUserRecord,
  getUserRecord,
};
