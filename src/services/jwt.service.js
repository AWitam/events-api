const jwt = require("jsonwebtoken");

async function createToken(userId) {
  const payload = {
    userId,
  };

  return new Promise((resolve) => {
    jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: "1hr" }, (err, val) => {
      if (err) {
        throw new Error("Failed. Reason: ", err.message);
      }
      resolve(val);
    });
  });
}

async function validateToken(token) {
  return new Promise((resolve) => {
    jwt.verify(token, process.env.JWT_TOKEN, (err, val) => {
      if (err) {
        // todo: add unauthorized exception
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
