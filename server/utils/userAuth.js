const bcrypt = require("bcryptjs");
require("dotenv").config();

const comparePassword = (plain, hashed) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(plain, hashed, (err, isMatch) => {
      if (err) {
        reject(err);
      }
      resolve(isMatch);
    });
  });

const hashPassword = (plain) =>
  new Promise((resolve, reject) => {
    bcrypt.hash(plain, 10, (err, hash) => {
      if (err) {
        reject(err);
      }
      resolve(hash);
    });
  });

module.exports = { comparePassword, hashPassword };
