import { configureStore } from "@reduxjs/toolkit";
import articleListReducer from "./articleListSlice";
import articleDetailReducer from "./articleDetailSlice";
import bookmarkListReducer from "./bookmarkListSlice";

export const store = configureStore({
    reducer: {
        articleList: articleListReducer,
        articleDetail: articleDetailReducer,
        bookmarkList: bookmarkListReducer
    }
})