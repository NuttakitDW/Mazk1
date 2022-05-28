import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { ethers } from "ethers";
import dropList from "./whitelist.json";

let tree;

function hashToken(wallet) {
  return Buffer.from(
    ethers.utils.solidityKeccak256(["address"], [wallet]).slice(2),
    "hex"
  );
}

function buildTree() {
  let merkleTree = new MerkleTree(
    dropList.map((drop) => hashToken(drop)),
    keccak256,
    { sortPairs: true }
  );
  return merkleTree;
}

export function getProof(wallet) {
  return tree.getHexProof(hashToken(wallet));
}

tree = buildTree()
// console.log(tree.getHexRoot());
