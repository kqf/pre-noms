import { createSlice, PayloadAction } from "@reduxjs/toolkit";


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
    }
});
