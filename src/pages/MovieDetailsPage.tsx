import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";

import {useAppDispatch} from "../hooks/useHooks";
import {moviesActions} from "../redux/slices/moviesSlice";
import DetailsComponent from "../components/MovieDetailsContainer/DetailsComponent";

const MovieDetailsPage = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) {
            dispatch(moviesActions.loadMovieById(id));
        }
    }, [id]);

    return (
        <div> <DetailsComponent/></div>
    );
};

export default MovieDetailsPage;
