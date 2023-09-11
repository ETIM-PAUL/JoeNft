import { ethers } from "hardhat";

async function main() {
  const nftContract = await ethers.getContractAt("NftInterface", "0x5f3a2E515981594B5a59596999D6D34eBce5CA99");

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
