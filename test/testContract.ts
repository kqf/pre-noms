import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("Minter", function () {
    let owner: SignerWithAddress;
    let prenoms: Contract;

    beforeEach(async () => {
        [owner] = await ethers.getSigners();
        const Prenoms = await ethers.getContractFactory("Prenoms");
        prenoms = await Prenoms.deploy();
        await prenoms.deployed();
    });

    it("Should mint a token with a given URI", async function () {
    // Create a phony account
        await prenoms.donateMint(owner.address, "Hello, world!");
        expect(await prenoms.tokenURI(0)).to.equal("ipfs://Hello, world!");

        await prenoms.donateMint(owner.address, "Second token");
        expect(await prenoms.tokenURI(1)).to.equal("ipfs://Second token");

        await prenoms.payToMint(owner.address, "Third token", {
            value: ethers.utils.parseEther('0.05')
        });
        expect(await prenoms.tokenURI(2)).to.equal("ipfs://Third token");

        await expect(prenoms.payToMint(owner.address, "Third token", {
            value: ethers.utils.parseEther('0.05')
        })).to.be.revertedWith('Already minted!');

        // We have created exactly 3 tokens so far
        expect(await prenoms.totalSupply()).to.equal(3);

    });
});
