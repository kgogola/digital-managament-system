const path = require("path");
const Web3 = require("web3");

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    contracts_build_directory: path.join(__dirname, "../src/contracts"),
    networks: {
        develop: {
            host: "localhost",
            port: 8545,
            network_id: 5777,
        }
    },
};
