const router = require("express").Router();
const { ipfs } = require("../ipfsConfig");
const { enCrypt, deCrypt } = require("../endenpt/store");

router.get("/encrypt", async (req, res) => {
  const rawKey = req.body.key;
});

router.get("/decrypt", async (req, res) => {
  const hashKey = req.body.key;
  const realKey = deCrypt(hashKey);
  const ipfsCDN = await ipfs.name.resolve(realKey);
});
