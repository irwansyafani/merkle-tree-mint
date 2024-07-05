// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract XNFT is ERC721, Ownable {
    using SafeMath for uint256;

    uint256 private _tokenIdCounter;
    mapping(address => uint256) private _balances;
    bytes32 public merkleRoot;

    constructor(
        bytes32 _merkleRoot
    ) ERC721("XNFT", "XNFT") Ownable(msg.sender) {
        merkleRoot = _merkleRoot;
    }

    modifier isWhitelisted(bytes32[] calldata proof) {
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(
            MerkleProof.verify(proof, merkleRoot, leaf),
            "Your account is not whitelisted"
        );
        _;
    }

    function balanceOf(address owner) public view override returns (uint256) {
        return _balances[owner];
    }

    function totalMinted() public view returns (uint256) {
        return _tokenIdCounter;
    }

    function mint() public onlyOwner {
        _tokenIdCounter.add(1);
        _safeMint(msg.sender, _tokenIdCounter);
        _balances[msg.sender] = _balances[msg.sender].add(1);
    }

    function whitelistMint(
        bytes32[] calldata proof
    ) public isWhitelisted(proof) {
        _tokenIdCounter++;
        _safeMint(msg.sender, _tokenIdCounter);
        _balances[msg.sender] = _balances[msg.sender].add(1);
    }

    function transfer(address to, uint256 tokenId) public {
        _safeTransfer(msg.sender, to, tokenId);
        _balances[msg.sender] = _balances[msg.sender].sub(1);
        _balances[to] = _balances[to].add(1);
    }
}
