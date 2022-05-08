const bcrypt = require("bcryptjs");

async function getHashedPassword(password) {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}

async function validatePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

module.exports = { getHashedPassword, validatePassword };
