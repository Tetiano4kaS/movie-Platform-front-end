import {configureStore} from "@reduxjs/toolkit";

import {moviesReducer} from "./slices/moviesSlice";
import {themeReducer} from "./slices/themeSlice";
import {searchReducer} from "./slices/searchSlice";

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        theme: themeReducer,
        search: searchReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
