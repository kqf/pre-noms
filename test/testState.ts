import { buildStore, dataFetched } from "../src/store"

describe("Check the store logic", function () {
    it("Interact with the store", async function () {
        const store = buildStore()
        store.dispatch(dataFetched("this are the data"))
        console.log("Done");
    });
});
