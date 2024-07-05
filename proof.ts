const keccakHash = require("keccak256");
const { leaves, merkle_tree, root_hash } = require("./config.ts");

// * ✅ Use an address that already registered to the merkle tree
const claiming_address = leaves[0] // first index of whitelisted.json
// * ❌ Use an address that is not registered to the merkle tree
// const claiming_address = keccakHash(0xca35b7d915458ef540ade6068dfe2f44e8fa733c); // the first index address

const hex_proof = merkle_tree.getHexProof(claiming_address);
// console.log(hex_proof);

const verified = merkle_tree.verify(hex_proof, claiming_address, root_hash);
// console.log(verified);


module.exports = { hex_proof }