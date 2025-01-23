const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config();

const generateAccessToken = (email, role) => {
  const payload = { email, role };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "86400s" });
};

module.exports = {generateAccessToken}