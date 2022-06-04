import { expect } from "chai";
import { ethers } from "hardhat";

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Prenoms = await ethers.getContractFactory("Prenoms");
    const prenoms = await Prenoms.deploy("Hello, world!");
    await prenoms.deployed();

    expect(await prenoms.greet()).to.equal("Hello, world!");

    const setGreetingTx = await prenoms.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await prenoms.greet()).to.equal("Hola, mundo!");
  });
});
