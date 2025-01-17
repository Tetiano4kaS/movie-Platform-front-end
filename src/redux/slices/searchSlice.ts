import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IPaginatedMovies} from "../../interfaces/IMovieModel";
import {movieService} from "../../services/moviesService";

type SearchState = {
    search: IPaginatedMovies;
    query: string;
};

const initialState: SearchState = {
    search: {
        data: [],
        currentPage: 1,
        totalPages: 0,
        totalMovies: 0,
    },
    query: "",
};

const searchMovies = createAsyncThunk(
    "searchSlice/searchMovies",
    async (
        { query, page = 1 }: { query: string; page: number },
        thunkAPI
    ) => {
        try {
            if (!query.trim()) {
                return initialState.search;
            }
            const filters = { title: query, page };
            const movies = await movieService.getAll(filters);
            return thunkAPI.fulfillWithValue(movies);
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

const searchSlice = createSlice({
    name: "searchSlice",
    initialState,
    reducers: {
        clearQuery(state) {
            state.query = ""; // Очищення пошукового запиту
        },
        clearSearchResults(state) {
            state.search = initialState.search;
            state.query = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchMovies.fulfilled, (state, action) => {
                state.search = action.payload as IPaginatedMovies;
            })
            .addCase(searchMovies.rejected, (state) => {
                state.search = initialState.search;
            });
    },
});
const { reducer: searchReducer, actions } = searchSlice;
const searchActions = { ...actions, searchMovies };

export { searchActions, searchReducer };
