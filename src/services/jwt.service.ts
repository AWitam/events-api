import jwt from "jsonwebtoken";

async function createToken(userId: number) {
  const secret = process.env.JWT_TOKEN;

  return new Promise((resolve) => {
    if (secret) {
      jwt.sign({ userId }, secret, { expiresIn: "1hr" }, (error, value) => {
        if (error) {
          throw new Error(`Failed. Reason: ${error.message}`);
        }
        resolve(value);
      });
    }
  });
}

async function validateToken(token: string) {
  const secret = process.env.JWT_TOKEN;

  return new Promise((resolve) => {
    if (secret) {
      jwt.verify(token, secret, (error, value) => {
        if (error) {
          // todo: add unauthorized exception
          throw new Error(`Token sign failed. ${error.message}`);
        }
        resolve(value);
      });
    }
  });
}

export { createToken, validateToken };
