import React, {useState} from 'react';

import {useAppDispatch} from "../../hooks/useHooks";
import {searchActions} from "../../redux/slices/searchSlice";
import styles from "./Search.module.css";

const SearchComponent = () => {
    const [query, setQuery] = useState('');
    const dispatch = useAppDispatch();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim() === '') {
            dispatch(searchActions.clearSearchResults());
        } else {
            dispatch(searchActions.searchMovies({query, page: 1}));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        if (newQuery.trim() === '') {
            dispatch(searchActions.clearSearchResults());
        }
    };

    return (
        <div className={styles.searchContainer}>
            <form onSubmit={handleSearch}>
                <input
                    className={styles.searchInput}
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search for movies..."
                />
                <button type="submit" className={styles.searchButton}>Search</button>
            </form>
        </div>
    );
};

export default SearchComponent;
