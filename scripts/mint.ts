import { ethers } from "hardhat";

async function main() {
  const nftContract = await ethers.getContractAt("NftInterface", "0xe08E83520ab894BeFe423C9991272af8F84AbE80");

  const ETHHolder = "0x9d4eF81F5225107049ba08F69F598D97B31ea644";
  const ETHHolderImpersonate = await ethers.getImpersonatedSigner(ETHHolder);

  const payment = ethers.parseEther("0.001")

  await nftContract.connect(ETHHolderImpersonate).mintNFT({value: payment});

  const string = await nftContract.connect(ETHHolderImpersonate).tokenURI(1);

  console.log(string);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
