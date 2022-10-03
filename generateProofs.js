const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const whiteListFile = require("./whitelist.json");
const hashToken = require("./utils").hashToken;
const fs = require("fs");
const ProofsFile = "PROOFS.json"


const whitelist = Object.entries(whiteListFile);
const myMerkle = generateMerkleTree(whiteListFile)
const whitelistTree = myMerkle.tree;
const whitlelistProofs = myMerkle.leaves.map((x) => whitelistTree.getHexProof(x));
const whitelistRoot = whitelistTree.getHexRoot();


generateProofsFile(whitlelistProofs)


fs.writeFile("ROOT.txt", whitelistRoot, (err) => {
  if (err) {
    console.error(err);
    return;
  }
});

try {
  let rawdata = fs.readFileSync('Proofs.json');
  console.log("Merkle Root is :", whitelistRoot)
} catch (error) {

  console.log("Error on file creation", error)
}


function getMerkleTree() {
  const myMerkle = generateMerkleTree(whiteListFile)
  return myMerkle
}

function generateMerkleTree(whiteListFile) {
  console.log("Merkle tree Generated")
  const whitelist = Object.entries(whiteListFile);
  const whitlelistLeaves = whitelist.map((token) => hashToken(...token));
  const whitelistTree = new MerkleTree(whitlelistLeaves, keccak256, { sortPairs: true });
  return { tree: whitelistTree, leaves: whitlelistLeaves }

}

function generateProofsFile(whitlelistProofs) {
  var table = [];

  whitlelistProofs.forEach((element, index) => {
    table.push({ address: whitelist[index][0], proof: element });
  });

  fs.writeFile(ProofsFile, JSON.stringify(table), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  console.log("Proofs for " + table.length + " address generated in " + ProofsFile)
}

module.exports = { getMerkleTree };
