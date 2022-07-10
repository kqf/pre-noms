import { configureStore, createSlice, Store, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tokenReducer from "./tokens"

export const buildStore: () => Store = () => configureStore({
    reducer: tokenReducer
});

export const fetchTokens = (contract: any) => {
    return createAsyncThunk<{count: number}>('tokens/fetchTotalSupply', async () => {
        const countRaw: number = parseInt(await contract.totalSupply());
        const count: number = isNaN(countRaw) ? 0 : countRaw;
        return {count: count}
    });
}

const store: Store = buildStore()
export type RootState = ReturnType<typeof store.getState>;
export default store;
