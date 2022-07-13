import { ethers } from "hardhat";
import { buildStore } from "../src/store/store"
import { totalCountChanged, fetchAllTokens } from "../src/store/tokens"


describe("Check the store logic", function () {
    it("Interact with the store", async function () {
        // Create a phony account
        const Prenoms = await ethers.getContractFactory("Prenoms");
        const prenoms = await Prenoms.deploy();
        await prenoms.deployed();
        const store = buildStore()
        // @ts-ignore
        await store.dispatch(fetchAllTokens(prenoms));
        console.log("Done");
    });
});
