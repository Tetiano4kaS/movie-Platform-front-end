import React from 'react';
import cn from "classnames";

import {useAppDispatch, useAppSelector} from "../../hooks/useHooks";
import styles from "./Details.module.css";
import {moviesActions} from "../../redux/slices/moviesSlice";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const DetailsComponent = () => {
    const { movie } = useAppSelector((state) => state.movies);
    const {theme} = useAppSelector(state => state.theme);
    const {isLoading} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const renderStars = (voteAverage: number) => {
        const maxStars = 5;
        const rating = Math.round(voteAverage / 2);
        const stars = [];

        for (let i = 0; i < maxStars; i++) {
            if (i < rating) {
                stars.push(<span key={i}>&#9733;</span>);
            } else {
                stars.push(<span key={i}>&#9734;</span>);
            }
        }

        return stars;
    };
    const handleToggleFavorite = async () => {
        if (movie) {
            await dispatch(moviesActions.toggleFavorite(movie._id));
            await dispatch(moviesActions.loadMovieById(movie._id));
        }
    };
    const handleUpdateMovie = () => {
        if (movie) {
            navigate(`/movies/update/${movie._id}`, { state: movie });
        }
    };
    const handleDeleteMovie = async () => {
        if (movie && window.confirm("Are you sure you want to delete this movie?")) {
            await dispatch(moviesActions.deleteMovie(movie._id));
            alert("Movie deleted successfully!");
            navigate("/movies");
        }
    };


    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : movie ? (
                <div className={cn(styles.detailsContainer, {[styles.detailsContainer_dark!]: theme})}>
                    <div className={styles.posterContainer}>
                        <img src={movie.image} alt={movie.title} className={styles.posterImage}/>
                    </div>
                    <div className={styles.detailsContent}>
                        <h2 className={styles.detailsTitle}>{movie.title}</h2>
                        <p className={styles.rating}><strong>Rating:</strong> {renderStars(movie.rating)}</p>
                        <p className={styles.overview}>{movie.description}</p>
                        <div className={styles.additionalDetails}>
                            <p><strong>Release Date:</strong> {movie.releaseDate}</p>
                            <p><strong>Genres:</strong> {movie.genre?.join(", ")}</p>
                            <p><strong>Actors:</strong> {movie.actors?.join(", ")}</p>
                            <p><strong>Director:</strong> {movie.director}</p>
                            <strong>Favourite:</strong>
                            <button onClick={handleToggleFavorite} className={styles.favoriteButton}>
                                {movie?.isFavorite ? (
                                    <FaHeart style={{color: "red"}}/>
                                ) : (
                                    <FaRegHeart style={{color: "gray"}}/>
                                )}
                            </button>
                            <button onClick={handleUpdateMovie} className={styles.updateButton}>
                                Update Movie
                            </button>
                            <button onClick={handleDeleteMovie} className={styles.deleteButton}>
                                Delete Movie
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No movie details available.</p>
            )}
        </div>
    );
};

export default DetailsComponent;
