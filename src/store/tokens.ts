import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";



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
            action: PayloadAction<string>
        ) => {
            console.log("Fetching data")
        }
    }
});

export const fetchAllTokens = (contract: any) => {
    return createAsyncThunk<{count: number}>('tokens/fetchTotalSupply', async () => {
        const countRaw: number = parseInt(await contract.totalSupply());
        const count: number = isNaN(countRaw) ? 0 : countRaw;
        return {count: count}
    });
}
export const {addedToken, totalCountChanged} = slice.actions;
export default slice.reducer;
