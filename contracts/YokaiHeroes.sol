// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/IYokaiHeroesDescriptor.sol";

/// @title YokaiHeroes NFTs
/// @notice On-chain generated NFTs
contract YokaiHeroes is ERC721Enumerable, Ownable, ReentrancyGuard {

    mapping(uint256 => address) private _addresses;

    constructor() ERC721("YokaiHeroes", "YOKAIH") {
    }

    // save bytecode by removing implementation of unused method
    function _baseURI() internal view virtual override returns (string memory) {}

    /// @notice return json data about the Yokai attached to the tokenId
    /// @param tokenId id of the Yokai from which the json will be retrieve
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return IYokaiChainDescriptor(_addresses[tokenId]).tokenURI();
    }

    /// @notice Update an address attached to a token id
    /// @param tokenId tokenId to update
    /// @param adr new address
    function update(uint256 tokenId, address adr) public onlyOwner {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        _addresses[tokenId] = adr;
    }

    /// @notice Create a Yokai using the address as descriptor
    /// @param adr address of the descriptor
    function create(address adr) public nonReentrant onlyOwner {
        uint256 nextTokenId = totalSupply() + 1;
        _addresses[nextTokenId] = adr;
        _safeMint(msg.sender, nextTokenId);
    }
}
