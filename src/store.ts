import { configureStore, createSlice, Store, PayloadAction } from "@reduxjs/toolkit";

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


const store: Store = buildStore()
export type RootState = ReturnType<typeof store.getState>;
export const { dataFetched } = defaults.actions;
export default store;
