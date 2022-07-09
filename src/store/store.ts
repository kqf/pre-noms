import { configureStore, createSlice, Store, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const defaults = createSlice({
    name: "defaults",
    initialState: [],
    reducers: {
        dataFetched(
            defaults: Array<any>,
            action: PayloadAction<any>
        ) {
            console.log(action.payload)
        },
    }
})

export const buildStore: () => Store = () => configureStore({
    reducer: defaults.reducer
});

export const fetchTokens = (contract: any) => {
    return createAsyncThunk('tokens/fetchTotalSupply', async () => {
        const countRaw: number = parseInt(await contract.totalSupply());
        const count: number = isNaN(countRaw) ? 0 : countRaw;
        return count
    });
}

const store: Store = buildStore()
export type RootState = ReturnType<typeof store.getState>;
export const { dataFetched } = defaults.actions;
export default store;
