// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/IYokaiSpecialDescriptor.sol";

/// @title YokaiSpecial NFTs
/// @notice On-chain generated NFTs
contract YokaiSpecial is ERC721Enumerable, Ownable, ReentrancyGuard {

    mapping(uint256 => address) private _addresses;

    constructor() ERC721("YokaiSpecial", "YOKAI") {
    }

    // save bytecode by removing implementation of unused method
    function _baseURI() internal view virtual override returns (string memory) {}

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return IYokaiChainDescriptor(_addresses[tokenId]).tokenURI();
    }

    /// @notice Create a Yokai using the address as descriptor
    /// @param adr address of the descriptor
    function create(address adr) public nonReentrant onlyOwner {
        uint256 nextTokenId = totalSupply() + 1;
        _addresses[nextTokenId] = adr;
        _safeMint(msg.sender, nextTokenId);
    }
}
