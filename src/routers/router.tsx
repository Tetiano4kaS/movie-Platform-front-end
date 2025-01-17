import {createBrowserRouter, Navigate} from "react-router-dom";
import React from "react";
import MainLayout from "../layouts/MainLayout";
import MoviesPage from "../pages/MoviesPage";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import CreateMoviePage from "../pages/CreateMoviePage";


const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, children: [
            {index: true, element: <Navigate to={'movies'}/>},
            {path: 'movies', element: <MoviesPage/>},
            {path: '/movies/details/:id', element: <MovieDetailsPage/>},
            {path: '/movies/create/movie', element: <CreateMoviePage/>},
            {path: '/movies/update/:id', element: <CreateMoviePage/>},
        ]
    }
]);

export {router}
