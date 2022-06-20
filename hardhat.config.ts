import("@nomiclabs/hardhat-waffle");
import ("@nomiclabs/hardhat-etherscan");
import {environment} from "./environment";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const PK = environment.pk;
const INFURA_URL = environment.infuraUrl;
const ETHER_KEY = environment.etherKey;

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: INFURA_URL,
      accounts: [PK]
    }
  },
  etherscan: {
    apiKey: ETHER_KEY
  }
};
