import { expect } from "chai";
import { ethers } from "hardhat";

describe("Minter", function () {
  it("Should mint a token with a given URI", async function () {
    // Create a phony account
    const [owner] = await ethers.getSigners();

    const Prenoms = await ethers.getContractFactory("Prenoms");
    const prenoms = await Prenoms.deploy();
    await prenoms.deployed();

    await prenoms.donateMint(owner.address, "Hello, world!");
    expect(await prenoms.tokenURI(0)).to.equal("ipfs://Hello, world!");

    await prenoms.donateMint(owner.address, "Second token");
    expect(await prenoms.tokenURI(1)).to.equal("ipfs://Second token");
  });
});
