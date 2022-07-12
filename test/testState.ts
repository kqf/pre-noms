import { ethers } from "hardhat";
import { buildStore, fetchAllTokens } from "../src/store/store"
import { totalCountChanged } from "../src/store/tokens"


describe("Check the store logic", function () {
    it("Interact with the store", async function () {
        // Create a phony account
        const Prenoms = await ethers.getContractFactory("Prenoms");
        const prenoms = await Prenoms.deploy();
        await prenoms.deployed();


        const store = buildStore()
        store.dispatch(totalCountChanged("this are the data"))
        // @ts-ignore
        store.dispatch(fetchAllTokens(prenoms));
        console.log("Done");
    });
});
