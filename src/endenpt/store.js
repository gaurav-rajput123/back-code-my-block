const Crypt = require("cryptr");
require("dotenv").config();
const crypto = new Crypt(
  "danzoGanduThaParThaKaafiStrongAndLoyalAsliChutiyaToHiruzenSarutobiTha@123$456&789"
);

const enCrypt = (key) => {
  return crypto.encrypt(key);
};

const deCrypt = (code) => {
  return crypto.decrypt(code);
};

module.exports = {
  enCrypt: enCrypt,
  deCrypt: deCrypt
};
