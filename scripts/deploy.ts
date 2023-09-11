import { ethers } from "hardhat";

async function main() {
 
  const metadataURL = "ipfs://QmQxJLbvBKkegHQpFoysZ2mT2Pf6ZPYXhDnxHRxfot7bzY";

  const nft = await ethers.deployContract("BIG_JOE_NFT", [metadataURL]);

  await nft.waitForDeployment();

  console.log("NFT contract deployed successfully at", nft.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
