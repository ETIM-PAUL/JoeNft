// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

interface NftInterface {
    function mintNFT() external payable;

    function tokenURI(uint256 token_ID) external view returns (string memory);
}
