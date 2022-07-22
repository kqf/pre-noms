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
    size: number,
}

const slice = createSlice({
    name: "collection",
    initialState: {
        tokens: [],
        lastId: 0,
        size: 10,
    } as Collection,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(fetchAllTokens.fulfilled, (
            collection: Collection,
            action: PayloadAction<Collection>
        ) => {
            console.log("Fetching data >>>>");
            return action.payload;
        });
        builder.addCase(mintToken.fulfilled, (
            collection: Collection,
            action: PayloadAction<Token>
        ) => {
            collection.tokens.push(action.payload);
            console.log("Minted a token");
        });
        builder.addCase(mintToken.rejected, (
            collection: Collection,
            action: any
        ) => {
            console.log("There was an error", action);
        });
    }
});

const totalSupply = async (contract: Contract) => {
    const countRaw: number = parseInt(await contract.totalSupply());
    const count: number = isNaN(countRaw) ? 0 : countRaw;
    return count;
};

export const fetchAllTokens = createAsyncThunk<Collection, Contract>(
    'tokens/fetchTotalSupply',
    async (contract: Contract) => {
        const count: number = await totalSupply(contract);
        const size: number = await contract.maxSize().value;
        console.log("total supply", count);
        console.log("size", size);
        const tokens = Array<Token>();
        for (let i = 0; i < count; i++) {
            const uri: string = await contract.tokenURI(i);
            const isOwned: boolean = await contract.isOwned(uri);

            console.log(i);
            tokens.push({
                id: i,
                url: uri,
                isOwned: isOwned,
            });
        }

        const lastId = Math.max(...tokens.map(x => x.id));
        return { tokens, lastId, size: size };
    });

export const mintToken = createAsyncThunk<Token, { contract: Contract, signer: Signer }, { state: RootState }>(
    'tokens/mintToken',
    async (credentials: { contract: Contract, signer: Signer }, { getState }) => {
        const id: number = getState().lastId + 1;
        const contentId = 'link';
        const metadataURI = `${contentId}/${id}.json`;
        const connection: Contract = credentials.contract.connect(credentials.signer);
        const addr: string = connection.address;
        const result: TransactionResponse = await credentials.contract.payToMint(addr, metadataURI, {
            value: ethers.utils.parseEther('0.05'),
        });
        await result.wait();

        return {
            id,
            url: metadataURI,
            isOwned: true,
        } as Token;
    });


export const collectionComplete = createSelector(
    (state: any): Collection => { return state.collection; },
    (collection: Collection): boolean => collection.lastId >= collection.size
);

export default slice.reducer;
