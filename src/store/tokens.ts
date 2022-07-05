import { createSlice } from "@reduxjs/toolkit";


export interface Token {
    id: number,
    url: string,
    isOwned: boolean,
}

interface Action<T> {
    type: string,
    payload: T
}

const slice = createSlice({
    name: "orders",
    initialState: [] as Array<Token>,
    reducers: {
        addedToken: (
            orders: Array<Token>,
            action: Action<{ description: string }>
        ) => {
            console.log("Do nothing")
        },
    }
});
