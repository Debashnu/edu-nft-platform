// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EduNFT is ERC721URIStorage, Ownable {
    uint256 public _tokenIds;

    event NFTMinted(address indexed recipient, uint256 tokenId, string tokenURI);

    constructor(address initialOwner) ERC721("EduNFT", "EDU") Ownable(initialOwner) {}

    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        uint256 newItemId = ++_tokenIds; // Increments before assignment (gas-efficient)
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        emit NFTMinted(recipient, newItemId, tokenURI); // Emit event

        return newItemId;
    }
}
