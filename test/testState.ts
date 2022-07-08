import { ethers } from "hardhat";
import { buildStore, dataFetched, fetchTokens } from "../src/store"


describe("Check the store logic", function () {
    it("Interact with the store", async function () {
        // Create a phony account
        const Prenoms = await ethers.getContractFactory("Prenoms");
        const prenoms = await Prenoms.deploy();
        await prenoms.deployed();


        const store = buildStore()
        store.dispatch(dataFetched("this are the data"))
        // @ts-ignore
        store.dispatch(fetchTokens(prenoms));
        console.log("Done");
    });
});
