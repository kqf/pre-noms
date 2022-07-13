import { configureStore, Store } from "@reduxjs/toolkit";
import tokenReducer from "./tokens";

export const buildStore: () => Store = () => configureStore({
    reducer: tokenReducer
});



const store: Store = buildStore()
export type RootState = ReturnType<typeof store.getState>;
export default store;
