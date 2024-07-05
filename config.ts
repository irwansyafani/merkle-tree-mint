const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const addresses = require("./whitelisted.json");

const leaves = addresses.map(({ address }) => keccak256(address));
const merkle_tree = new MerkleTree(leaves, keccak256, {
  sortPairs: true,
});
const root_hash = merkle_tree.getRoot();
// console.log("Whitelist Merkle Tree\n", merkle_tree.toString());
// console.log("Root Hash:", root_hash);

module.exports = { leaves, merkle_tree, root_hash };
