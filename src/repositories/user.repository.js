const { Prisma } = require("@prisma/client");
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
        console.log("User already exists");
      }
    }
    throw e;
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
