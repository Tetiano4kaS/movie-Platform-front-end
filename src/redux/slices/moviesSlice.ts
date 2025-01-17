import { createAsyncThunk, createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {IMovieModel, IPaginatedMovies} from "../../interfaces/IMovieModel";
import {movieService} from "../../services/moviesService";

type MoviesSliceType = {
    movies: IPaginatedMovies;
    movie: IMovieModel | null;
    isLoading: boolean;
};

const initialState: MoviesSliceType = {
    movies: {
        data: [],
        currentPage: 1,
        totalPages: 1,
        totalMovies: 0,
    },
    movie: null,
    isLoading: false,
};

const loadMovies = createAsyncThunk(
    "moviesSlice/loadMovies",
    async (filters: { title?: string; genre?: string; rating?: number; page?: number; limit?: number }, thunkAPI) => {
        try {
            const { title, genre, rating, page = 1, limit = 10 } = filters;
            const movies = await movieService.getAll({ title, genre, rating, page, limit });
            return thunkAPI.fulfillWithValue(movies);
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

const loadMovieById = createAsyncThunk("moviesSlice/loadMovieById", async (id: string, thunkAPI) => {
    try {
        console.log("movieSlice")
        const movie = await movieService.getMovieById(id);
        console.log(movie, "ms-loadMovieById")
        return thunkAPI.fulfillWithValue(movie)
    } catch (e) {
        const error = e as AxiosError;
        return thunkAPI.rejectWithValue(error.response?.data);
    }
});

const createMovie = createAsyncThunk("moviesSlice/createMovie", async (movie: Partial<IMovieModel>, thunkAPI) => {
    try {
        const newMovie = await movieService.createMovie(movie);
        return thunkAPI.fulfillWithValue(newMovie);
    } catch (e) {
        const error = e as AxiosError;
        return thunkAPI.rejectWithValue(error.response?.data);
    }
});

const updateMovie = createAsyncThunk(
    "moviesSlice/updateMovie",
    async ({ id, updateData }: { id: string; updateData: Partial<IMovieModel> }, thunkAPI) => {
        try {
            const updatedMovie = await movieService.updateMovie(id, updateData);
            return thunkAPI.fulfillWithValue(updatedMovie);
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

const deleteMovie = createAsyncThunk("moviesSlice/deleteMovie", async (id: string, thunkAPI) => {
    try {
        await movieService.deleteMovie(id);
        return thunkAPI.fulfillWithValue(id);
    } catch (e) {
        const error = e as AxiosError;
        return thunkAPI.rejectWithValue(error.response?.data);
    }
});

const toggleFavorite = createAsyncThunk("moviesSlice/toggleFavorite", async (id: string, thunkAPI) => {
    try {
        const updatedMovie = await movieService.toggleFavorite(id);
        return thunkAPI.fulfillWithValue(updatedMovie);
    } catch (e) {
        const error = e as AxiosError;
        return thunkAPI.rejectWithValue(error.response?.data);
    }
});

const moviesSlice = createSlice({
    name: "moviesSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadMovies.fulfilled, (state, action) => {
                state.movies = action.payload;
                state.isLoading = false;
            })
            .addCase(loadMovieById.fulfilled, (state, action) => {
                state.movie = action.payload;
                console.log(action.payload)
                state.isLoading = false;
            })
            .addCase(createMovie.fulfilled, (state, action) => {
                state.movies.data.push(action.payload);
                state.isLoading = false;
            })
            .addCase(updateMovie.fulfilled, (state, action) => {
                state.movies.data = state.movies.data.map((movie) =>
                    movie._id === action.payload._id ? action.payload : movie
                );
                state.isLoading = false;
            })
            .addCase(deleteMovie.fulfilled, (state, action) => {
                state.movies.data = state.movies.data.filter((movie) => movie._id !== action.payload);
                state.isLoading = false;
            })
            .addCase(toggleFavorite.fulfilled, (state, action) => {
                if (state.movie?._id === action.payload._id) {
                    state.movie = action.payload;
                }
                state.isLoading = false;
        })

    .addMatcher(isPending(loadMovies, loadMovieById, createMovie, updateMovie, deleteMovie, toggleFavorite), (state) => {
                state.isLoading = true;
            })
            .addMatcher(isRejected(loadMovies, loadMovieById, createMovie, updateMovie, deleteMovie, toggleFavorite), (state) => {
                state.isLoading = false;
            });
    },
});

const { reducer: moviesReducer } = moviesSlice;
const moviesActions = { loadMovies, loadMovieById, createMovie, updateMovie, deleteMovie, toggleFavorite };

export { moviesActions, moviesReducer };
