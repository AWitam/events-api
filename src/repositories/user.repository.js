const { db } = require("../utils/db.util");

const userSelect = {
  id: true,
  email: true,
  username: true,
};

async function createUserRecord(userData) {
  return await db.user.create({
    data: userData,
    select: {
      id: true,
    },
  });
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

async function updateUserRecord(dataPayload) {
  const { id, newUsername } = dataPayload;
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
