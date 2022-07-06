import { combineReducers, configureStore, Store } from "@reduxjs/toolkit";

function debugReducer(state = [], action) {
    console.log(action.payload)
}

export const buildStore: () => Store = () => configureStore(debugReducer, []);


const store: Store = buildStore()
export type RootState = ReturnType<typeof store.getState>;
export default store;
