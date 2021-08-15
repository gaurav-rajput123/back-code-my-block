const { create } = require("ipfs-http-client");

const ipfs = create();

module.exports = { ipfs: ipfs };
