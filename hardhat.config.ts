import("@nomiclabs/hardhat-waffle");
import ("@nomiclabs/hardhat-etherscan");
import "@nomiclabs/hardhat-ethers";
import {environment} from "./environment";
// import "./tasks/transfer";
// import "./tasks/transferFrom";
// import "./tasks/approve";

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
    apiKey: {
      rinkeby: ETHER_KEY
    },
    customChains: [
      {
        network: "rinkeby",
        chainId: 4,
        urls: {
          apiURL: "https://api-rinkeby.etherscan.io/api",
          browserURL: "https://rinkeby.etherscan.io"
        }
      }
    ]
  }
};
