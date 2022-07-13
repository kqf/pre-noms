import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contract } from "ethers";



export interface Token {
    id: number,
    url: string,
    isOwned: boolean,
}

const slice = createSlice({
    name: "orders",
    initialState: [] as Array<Token>,
    reducers: {
        addedToken: (
            orders: Array<Token>,
            action: PayloadAction<{ description: string }>
        ) => {
            console.log("Do nothing")
        },
        totalCountChanged: (
            orders: Array<Token>,
            action: PayloadAction<Array<Token>>
        ) => {
            console.log("Fetching data")
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchAllTokens.fulfilled, (
            orders: Array<Token>,
            action: PayloadAction<Array<Token>>
        ) => {
            console.log("Fetching data")
        });
    }
});

const totalSupply = async (contract: Contract) => {
    const countRaw: number = parseInt(await contract.totalSupply());
    const count: number = isNaN(countRaw) ? 0 : countRaw;
    return count
}

export const fetchAllTokens = createAsyncThunk<Array<Token>, Contract>(
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

        return tokens;
    });

export const { addedToken, totalCountChanged } = slice.actions;
export default slice.reducer;
