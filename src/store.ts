import { configureStore, createSlice, Store, PayloadAction } from "@reduxjs/toolkit";

const defaults = createSlice({
    name: "defaults",
    initialState: [],
    reducers: {
        createVendor(
            defaults: Array<any>,
            action: PayloadAction<any>
        ) {
        },
    }
    })

export const buildStore: () => Store = () => configureStore({
    reducer: defaults.reducer
});


const store: Store = buildStore()
export type RootState = ReturnType<typeof store.getState>;
export default store;
