// contracts/SPRHRO.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SuperHero is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter public tokenIds;

    constructor() ERC721("SuperHero", "SPRHRO") {}

    function createHero(address newOwner, string memory tokenURI)  public returns (uint256)
    {
        uint256 newItemId = tokenIds.current();
        _mint(newOwner, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenIds.increment();

        return newItemId;
    }
}