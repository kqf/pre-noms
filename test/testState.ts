import { expect } from "chai";
import { ethers } from "hardhat";
import { fetchAllTokens, mintToken } from "../src/store/collection";
import { buildStore } from "../src/store/store";


describe("Check the store logic", function () {
    it("Interact with the store", async function () {
        // Create a phony account
        const [owner] = await ethers.getSigners();
        const Prenoms = await ethers.getContractFactory("Prenoms");
        const prenoms = await Prenoms.deploy();
        await prenoms.deployed();
        const store = buildStore()

        await prenoms.donateMint(owner.address, "dummy url1");
        await prenoms.donateMint(owner.address, "dummy url2");
        await prenoms.donateMint(owner.address, "dummy url3");

        // @ts-ignore
        await store.dispatch(fetchAllTokens(prenoms));
        expect(store.getState().tokens.length).to.equal(3)
        // @ts-ignore
        await store.dispatch(mintToken({contract: prenoms, signer: owner}));

        console.log("Final");
        console.log(store.getState());
        // expect(store.getState().collection).to.equal(1);
        console.log("Done");
    });
})
