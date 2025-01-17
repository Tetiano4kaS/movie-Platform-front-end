import React, {useEffect, useMemo, useState} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks/useHooks";
import {moviesActions} from "../../redux/slices/moviesSlice";
import MovieComponent from "./MovieComponent";

import styles from './MoviesComponent.module.css';
import PaginationComponent from "../../Pagination/PaginationComponent";
import {IMovieModel} from "../../interfaces/IMovieModel";

const MoviesComponent = () => {
    const {movies} = useAppSelector(state => state.movies)
    const {search, query} = useAppSelector(state => state.search);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState(1);
    const {isLoading} = useAppSelector(state => state.movies);
    const [rating, setRating] = useState<number | null>(null);
    const [genre, setGenre] = useState<string | null>(null);

    useEffect(() => {
        const filters = {
            query: query.trim(),
            page,
            ...(rating ? { rating } : {}),
            ...(genre ? { genre } : {}),
        };
        dispatch(moviesActions.loadMovies(filters));
    }, [query, page, rating, genre]);

    const handleRatingChange = (selectedRating: number | null) => {
        setRating(selectedRating);
        setPage(1);
    };

    const handleGenreChange = (selectedGenre: string | null) => {
        setGenre(selectedGenre);
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const hasSearchResults = useMemo(() => search?.data?.length > 0, [search]);
    const resultsToRender = useMemo(
        () => (hasSearchResults ? search.data : movies?.data || []),
        [hasSearchResults, search, movies]
    );

    return (
        <div>
            <div className={styles.filterContainer}>
                <div className={styles.filter}>
                    <label htmlFor="ratingFilter">Filter by Rating:</label>
                    <select
                        id="ratingFilter"
                        value={rating || ""}
                        onChange={(e) => handleRatingChange(e.target.value ? Number(e.target.value) : null)}
                    >
                        <option value="">All Ratings</option>
                        <option value="5">5 Star</option>
                        <option value="6">6 Star</option>
                        <option value="7">7 Star</option>
                        <option value="8">8 Star</option>
                        <option value="9">9 Star</option>
                    </select>
                </div>
                <div className={styles.filter}>
                    <label htmlFor="genreFilter">Filter by Genre:</label>
                    <select
                        id="genreFilter"
                        value={genre || ""}
                        onChange={(e) => handleGenreChange(e.target.value || null)}
                    >
                        <option value="">All Genres</option>
                        <option value="Action">Action</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Drama">Drama</option>
                        <option value="Horror">Horror</option>
                        <option value="SciFi">Sci-Fi</option>
                    </select>
                </div>
            </div>
            <div>
                {isLoading ? <p>Loading...</p> :
                    <div className={styles.moviesContainer}>
                        <div className={styles.moviesRow}>
                            {resultsToRender.map((movie: IMovieModel) => (
                                <MovieComponent key={movie._id} movie={movie}/>
                            ))}
                        </div>
                        <div className={styles.pagination}>
                            <PaginationComponent
                                currentPage={page}
                                totalPages={movies.totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default MoviesComponent;
