import { Store } from "@reduxjs/toolkit";
import { createStore } from 'redux'


function debugReducer(state = [], action: any) {
    console.log(action.payload)
    return state;
}

export const buildStore: () => Store = () => createStore(debugReducer);


const store: Store = buildStore()
export type RootState = ReturnType<typeof store.getState>;
export default store;
