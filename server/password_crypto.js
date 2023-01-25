const Cryptr = require("cryptr");
const cryptr = new Cryptr("dummypasswfv90rVFl4Oce4OuEordresetkey", {
  pbkdf2Iterations: 10000,
  saltLength: 10,
});

const encryptedString = cryptr.encrypt("fv90rVFl4Oce4OuE");
const decryptedString = cryptr.decrypt(encryptedString);

console.log(encryptedString);
console.log(decryptedString);
