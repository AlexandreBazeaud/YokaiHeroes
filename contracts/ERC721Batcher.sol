// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract ERC721Batcher {
    function getIds(address erc721Address, address user) public view returns (uint256[] memory) {
        ERC721Enumerable nft = ERC721Enumerable(erc721Address);
        uint256 numTokens = nft.balanceOf(user);
        uint256[] memory uriList = new uint256[](numTokens);
        for (uint256 i; i < numTokens; i++) {
            uriList[i] = nft.tokenOfOwnerByIndex(user, i);
        }
        return (uriList);
    }

    function getTokenURIOf(address erc721Address, uint256[] memory ids) public view returns (string[] memory) {
        ERC721 nft = ERC721(erc721Address);
        string[] memory tokenURIS = new string[](ids.length);
        for (uint256 i; i < ids.length; i++) {
            uint256 id = ids[i];
            try nft.tokenURI(id) returns (string memory tokenURI) {
                tokenURIS[i] = tokenURI;
            } catch (bytes memory) {
                tokenURIS[i] = "";
            }
        }

        return (tokenURIS);
    }
}
