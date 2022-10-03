const { MerkleTree } = require("merkletreejs");
const whitelist = require("./oglist.json");
const prompt = require('prompt');
const { getMerkleTree } = require("./generateProofs");
const hashToken = require("./utils").hashToken;

prompt.start();

prompt.get(['address', 'root'], function(err, result) {
  if (err) {
    return onErr(err);
  }
  console.log('Command-line input received:');
  address = result.address.toLowerCase()
  root = result.root.toLowerCase()
  console.log(' address is : ' + address);
  console.log(' root is : ' + root);
  const WL = new Map();
  whitelist.forEach((element) => {
    WL.set(element.address.toLowerCase(), element.proof);
  });
  let proof = WL.get(address)
  const isWhitelist = verify(proof, address, root)

  console.log("Address is in the whitelist :", WL.has(address));
  console.log("verify is ok ", isWhitelist);
});


function onErr(err) {
  console.log(err);
  return 1;
}

function verify(proof, address, root) {
  const isWhitelist = getMerkleTree().tree.verify(proof, hashToken(address, 1), root)
  return isWhitelist
}

