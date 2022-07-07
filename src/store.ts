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

export const fetchTokens = (client: any) => {
    createAsyncThunk('posts/fetchPosts', async () => {
        const response = await client.totalSupply();
        return response.data
    })
}

const store: Store = buildStore()
export type RootState = ReturnType<typeof store.getState>;
export const { dataFetched } = defaults.actions;
export default store;
