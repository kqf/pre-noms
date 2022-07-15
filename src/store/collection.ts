import { TransactionResponse } from "@ethersproject/abstract-provider";
import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contract, ethers, Signer } from "ethers";
import { RootState } from "./store";



export interface Token {
    id: number,
    url: string,
    isOwned: boolean,
}


interface Collection {
    tokens: Array<Token>,
    lastId: number,
    totalSupply: number,
}

const slice = createSlice({
    name: "collection",
    initialState: {
        tokens: [],
        lastId: 0,
        totalSupply: 0,
    } as Collection,
    reducers: {
        addedToken: (
            collection: Collection,
            action: PayloadAction<{ description: string }>
        ) => {
            console.log("Do nothing")
        },
        totalCountChanged: (
            collection: Collection,
            action: PayloadAction<Collection>
        ) => {
            console.log("Fetching data")
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchAllTokens.fulfilled, (
            collection: Collection,
            action: PayloadAction<Collection>
        ) => {
            console.log("Fetching data >>>>")
            return action.payload;
        });
    }
});

const totalSupply = async (contract: Contract) => {
    const countRaw: number = parseInt(await contract.totalSupply());
    const count: number = isNaN(countRaw) ? 0 : countRaw;
    return count
}

export const fetchAllTokens = createAsyncThunk<Collection, Contract>(
    'tokens/fetchTotalSupply',
    async (contract: Contract) => {
        const count: number = await totalSupply(contract);
        var tokens = Array<Token>();
        for (let i = 0; i < count; i++) {
            const uri: string = await contract.tokenURI(i);
            const isOwned: boolean = await contract.isOwned(uri);

            if (!isOwned)
                continue;

            tokens.push({
                id: i,
                url: uri,
                isOwned: isOwned,
            });
        }

        const lastId = Math.max(...tokens.map(x => x.id));
        return { tokens, lastId, totalSupply: count };
    });

export const mintToken = createAsyncThunk<Token, { contract: Contract, signer: Signer }, RootState>(
    'tokens/mintToken',
    async (data: {contract: Contract, signer: Signer}, state: RootState) => {
        const id: number = state.collection.lastId + 1;
        const url = contract.tokenURI(id);
        const contentId = 'link';
        const metadataURI = `${contentId}/${id}.json`;
        const connection: Contract = data.contract.connect(data.signer);
        const addr: string = connection.address;
        const result: TransactionResponse = await contract.payToMint(addr, metadataURI, {
          value: ethers.utils.parseEther('0.05'),
        });
        await result.wait();

        return {
            id,
            url: url,
            isOwned: true,
        } as Token;
    });


export const collectionComplete = createSelector(
    (state: any): Collection => { return state.collection; },
    (collection: Collection): boolean => collection.lastId >= collection.totalSupply
)

export const { addedToken, totalCountChanged } = slice.actions;
export default slice.reducer;
