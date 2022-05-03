const jwt = require("jsonwebtoken");
const secret = "a6a0b848-fb12-45e2-9810-f5c0b4968047";

async function createToken(userId) {
  const payload = {
    userId,
  };

  return new Promise((resolve) => {
    jwt.sign(payload, secret, { expiresIn: "1hr" }, (err, val) => {
      if (err) {
        throw new Error("Failed. Reason: ", err.message);
      }
      resolve(val);
    });
  });
}

async function validateToken(token) {
  return new Promise((resolve) => {
    jwt.verify(token, secret, (err, val) => {
      if (err) {
        // todo: unauthorized
        throw new Error("Token sign failed.", err.message);
      }
      resolve(val);
    });
  });
}

module.exports = {
  createToken,
  validateToken,
};
