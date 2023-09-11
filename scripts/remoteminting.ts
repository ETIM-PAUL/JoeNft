import { ethers } from "hardhat";

async function main() {

  const payment = ethers.parseEther("0.001");

const myNFT = await ethers.getContractAt(
  "NftInterface",
  "0xe08E83520ab894BeFe423C9991272af8F84AbE80"
);

await myNFT.mintNFT(
  {value: payment}
);
const string = await myNFT.tokenURI(1);
console.log(string);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});