import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      { version: "0.8.20", settings: {} }, // Add this version
      { version: "0.8.28", settings: {} }, // Optional, if needed
    ],
  },
  networks: {
    educhain: {
      url: process.env.EDUCHAIN_RPC_URL, // EduChain RPC URL
      accounts: [process.env.PRIVATE_KEY as string], // Your wallet private key
    },
  },
  etherscan: {
    apiKey: process.env.EDUCHAIN_ETHERSCAN_API_KEY, // API key for verification
  },
};

export default config;
