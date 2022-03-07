const HDWalletProvider = require("@truffle/hdwallet-provider");
// MNEMONIC_PHRASE and INFURA_KEY are mentioned in .env file
const mnemonic =
  "cb0764fe064b7898bb399060a567f5c07525584fc306b74ed0549e00b2d97edb";
const infuraKey = "13b345ac340c4691a2a1b21efa500e98";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    "ropsten-infura": {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          "https://ropsten.infura.io/v3/" + infuraKey,
          0
        ),
      network_id: 3,
      gas: 5500000,
      gasPrice: 100000000000,
      timeoutBlocks: 2000,
    },
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.5.2",
    },
  },
};
