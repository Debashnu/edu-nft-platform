import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying EduNFT with account:", deployer.address);
  console.log(`Deploying from address: ${deployer.address}`);


  const EduNFT = await ethers.getContractFactory("EduNFT");
  const eduNFT = await EduNFT.deploy(deployer.address); // Pass deployer's address

  await eduNFT.waitForDeployment();

  console.log(`EduNFT deployed at: ${await eduNFT.getAddress()}`); // Replace eduNFT.address
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
