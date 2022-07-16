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

        // @ts-ignore
        await store.dispatch(fetchAllTokens(prenoms));
        // @ts-ignore
        await store.dispatch(mintToken({contract, signer: owner}));
        console.log("Done");
    });
})
