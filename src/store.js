import { configureStore } from "@reduxjs/toolkit";
import reducer from "./features/logSlice";

export const store = configureStore({
    reducer: {type: reducer }
})