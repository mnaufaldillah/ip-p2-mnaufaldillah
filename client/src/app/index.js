import { configureStore } from "@reduxjs/toolkit";
import articleListReducer from "./articleListSlice";
import articleDetailReducer from "./articleDetailSlice";

export const store = configureStore({
    reducer: {
        articleList: articleListReducer,
        articleDetail: articleDetailReducer
    }
})