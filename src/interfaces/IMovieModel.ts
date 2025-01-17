export interface IMovieModel {
    _id: string;
    title: string;
    description?: string;
    actors: string[];
    director?: string;
    genre: string[],
    isFavorite: boolean;
    image?: string;
    rating?: number;
    releaseDate: string;
}

export interface IPaginatedMovies {
    data: IMovieModel[];
    currentPage: number;
    totalPages: number;
    totalMovies: number;
}
