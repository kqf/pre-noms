// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Prenoms is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    mapping(string => bool) private existingURIs;

    constructor() ERC721("Prenoms", "MTK") {
        console.log("Created the token contract.");
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function _registerToken(string memory uri) internal returns (uint256) {
        require(!existingURIs[uri], "Already minted!");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        existingURIs[uri] = true;
        return tokenId;
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function payToMint(address to, string memory uri)
        public
        payable
        returns (uint256)
    {
        require(!existingURIs[uri], "Already minted!");
        require(msg.value >= 0.05 ether, "Need to pay up!");

        uint256 tokenId = _registerToken(uri);
        _mint(to, tokenId);
        _setTokenURI(tokenId, uri);

        return tokenId;
    }

    function donateMint(address to, string memory uri) public onlyOwner {
        require(!existingURIs[uri], "Already minted!");
        uint256 tokenId = _registerToken(uri);

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }
}
