import bcrypt from "bcryptjs";

async function getHashedPassword(password: string) {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}

async function validatePassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}

export { getHashedPassword, validatePassword };
