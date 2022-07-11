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
        totalCountChanged: (
            orders: Array<Token>,
            action: PayloadAction<Token>
        ) => {
            console.log("Fetching data")
        }
    }
});

export const {addedToken, totalCountChanged} = slice.actions;
export default slice.reducer;
