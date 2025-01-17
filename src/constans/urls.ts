const  baseURL = "http://localhost:4000";

const urls = {
    moviesUrl: '/movies',
    movieById: (id: string) => `/movies/${id}`,
    createMovie: '/movies',
    updateMovie: (id: string) => `/movies/${id}`,
    deleteMovie: (id: string) => `/movies/${id}`,
    toggleFavorite: (id: string) => `/movies/${id}/favorite`,
};

export { baseURL, urls };
