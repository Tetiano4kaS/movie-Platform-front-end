import React, {FC} from 'react';
import cn from "classnames";

import {useNavigate} from "react-router-dom";
import {FaHeart, FaStar} from 'react-icons/fa';
import styles from "./MoviesComponent.module.css";
import {useAppSelector} from "../../hooks/useHooks";
import {IMovieModel} from "../../interfaces/IMovieModel";

interface IProps {
    movie: IMovieModel
}

const MovieComponent: FC<IProps> = ({movie}) => {
    const {theme} = useAppSelector(state => state.theme)
    const navigate = useNavigate();
    const formattedRating = movie.rating;

    return (
        <div className={cn(styles.movieCard, {[styles.movieCard_dark!]: theme})}
             onClick={() => navigate(`/movies/details/${movie._id}`)}>
            <img src={movie.image} className={styles.moviePoster} alt="poster"/>
            <div className={styles.movieTitle}>{movie.title}</div>
            <div className={styles.movieRating}>
                <FaStar className={styles.starIcon}/>
                {formattedRating}
            </div>
            <strong>Favourite:</strong> {movie.isFavorite && <FaHeart className={styles.heartIcon} />}

        </div>
    );
};

export default MovieComponent;
