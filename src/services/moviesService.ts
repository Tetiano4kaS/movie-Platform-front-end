import {urls} from "../constans/urls";
import {IMovieModel, IPaginatedMovies} from "../interfaces/IMovieModel";
import {axiosInstance} from "./axiosService";


const movieService = {
    getAll: async (filters: { title?: string; genre?: string; rating?: number; page?: number; limit?: number }): Promise<IPaginatedMovies> => {
        const { title, genre, rating, page = 1, limit = 10 } = filters;
        const response = await axiosInstance.get(urls.moviesUrl, {
            params: { title, genre, rating, page, limit },
        });
        return response.data;
    },

    getMovieById: async (id: string): Promise<IMovieModel> => {
        console.log("movieService")
        const response = await axiosInstance.get(urls.movieById(id));
        console.log(response.data);
        return response.data;
    },

    createMovie: async (movie: Partial<IMovieModel>): Promise<IMovieModel> => {
        const response = await axiosInstance.post(urls.createMovie, movie);
        return response.data;
    },

    updateMovie: async (id: string, updateData: Partial<IMovieModel>): Promise<IMovieModel> => {
        const response = await axiosInstance.put(urls.updateMovie(id), updateData);
        return response.data;
    },

    deleteMovie: async (id: string): Promise<void> => {
        await axiosInstance.delete(urls.deleteMovie(id));
    },

    toggleFavorite: async (id: string): Promise<IMovieModel> => {
        const response = await axiosInstance.patch(urls.toggleFavorite(id));
        return response.data;
    },
};

export { movieService };
