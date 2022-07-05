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
