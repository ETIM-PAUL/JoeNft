// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Interface/NftInterface.sol";

contract BIG_JOE_NFT is ERC721 {
    //this uses the power of a function provided by openzepelin to convert number to string
    using Strings for uint256;

    string baseuri;

    string baseName = "nft";

    address payable public owner;

    //  price for one JOE NFT
    uint256 _price = 0.001 ether;

    //max number of nft
    uint public constant MAX_NFT_NUMBER = 1;

    uint public nftsMinted;

    event Withdrawal(uint amount, uint when);
    event Mint(address minter, uint amount, uint when);

    //The constructor sets a name for the token collection. Name is JOENFTTOKENS
    //symbol is JOEC
    constructor(string memory _baseuri) ERC721("JOENFTTOKENS", "JOEC") {
        baseuri = _baseuri;
        owner = payable(msg.sender);
    }

    modifier MaxNft() {
        require(nftsMinted < MAX_NFT_NUMBER, "JOE_NFTs Maximum");
        _;
    }

    modifier NftPrice() {
        require(msg.value == _price, "Incorrect Amount");
        _;
    }

    function mintNFT() public payable MaxNft NftPrice {
        nftsMinted = 1;
        _safeMint(msg.sender, nftsMinted);
        emit Mint(msg.sender, msg.value, block.timestamp);
    }

    function tokenURI(
        uint256 token_ID
    ) public view virtual override returns (string memory) {
        require(_exists(token_ID), "Doesn't Exist");

        string memory baseURI = _baseURI();
        return
            bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI)) : "";
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseuri;
    }

    //added function withdraw ether gotten from NFTs minting
    function withdraw() public {
        emit Withdrawal(address(this).balance, block.timestamp);
        owner.transfer(address(this).balance);
    }

    //empty msg.data
    receive() external payable {}

    //msg.data is not empty
    fallback() external payable {}
}
