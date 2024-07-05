const ethers = require("ethers");
const abi = require("./abi.json");
const { hex_proof } = require("./proof.ts");
const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc.sepolia.org/"
);

// ******************** CONFIGURATION
const contract_address = "0xd77B171493a1Ed576913B0e0655eE9035d85429f";
const private_key = ""; // TODO: Private key of one of whitelisted addresses

const account = new ethers.Wallet(private_key);
const signer = account.connect(provider);
const contract = new ethers.Contract(contract_address, abi, signer);

console.log("Connected to contract address", contract.address);
console.log(`[mint] is ${contract.mint ? "an exist function" : ""}`);
console.log(`[transfer] is ${contract.transfer ? "an exist function" : ""}`);
console.log(
  `[whitelistMint] is ${contract.whitelistMint ? "an exist function" : ""}`
);
console.log("\n");

// ******************** EXECUTION
(async () => {
  // Whitelist
  try {
    const tx_whitelist_mint = await contract.whitelistMint(hex_proof);
    console.log("[tx_whitelist_mint] hash:", await tx_whitelist_mint.hash);
  } catch (error) {
    console.log("[whitelistMint] An error occured when calling", error.message);
  }

  // Mint
  try {
    const tx_mint = await contract.mint();
    console.log("[tx_mint] hash:", await tx_mint.hash);
  } catch (error) {
    console.log("[tx_mint] An error occured when calling", error.message);
  }

  // Transfer
  try {
    const target_address = ""; // TODO: FILL THIS
    const token_id = 1; // TODO: DON'T FORGET TO CHANGE THIS ONE ON EVERY CALLS
    const tx_transfer = await contract.transfer(target_address, token_id);
    console.log("[tx_transfer] hash:", await tx_transfer.hash);
  } catch (error) {
    console.log("[tx_transfer] An error occured when calling", error.message);
  }

  console.log(
    `\nContract Explorer: https://sepolia.etherscan.io/address/${contract_address}`
  );
})();
