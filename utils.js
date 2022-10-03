
const ethers = require("ethers");

function hashToken(account, amount) {
  return Buffer.from(
    ethers.utils
      .solidityKeccak256(["address", "uint256"], [account, amount])
      .slice(2),
    "hex"
  );
}
module.exports = { hashToken };
