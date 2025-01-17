import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks/useHooks";
import { moviesActions } from "../../redux/slices/moviesSlice";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./CreateMovieComponent.module.css";

type FormData = {
    title: string;
    description: string;
    actors: string;
    director: string;
    genre: string;
    image: string;
    releaseDate: string;
    rating: number;
};

const CreateMovieComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const movieToEdit = location.state;

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        defaultValues: {
            title: "",
            description: "",
            actors: "",
            director: "",
            genre: "",
            image: null,
            releaseDate: "",
            rating: 0,
        },
    });

    useEffect(() => {
        if (movieToEdit) {
            setValue("title", movieToEdit.title || "");
            setValue("description", movieToEdit.description || "");
            setValue("actors", movieToEdit.actors.join(", ") || "");
            setValue("director", movieToEdit.director || "");
            setValue("genre", movieToEdit.genre.join(", ") || "");
            setValue("image", movieToEdit.image || "");
            setValue("releaseDate", movieToEdit.releaseDate || "");
            setValue("rating", movieToEdit.rating || 0);
        }
    }, [movieToEdit, setValue]);

    const onSubmit = async (data: FormData) => {
        const movieData = {
            ...data,
            actors: data.actors.split(",").map((actor) => actor.trim()),
            genre: data.genre.split(",").map((genre) => genre.trim()),
        };

        try {
            if (movieToEdit) {
                await dispatch(
                    moviesActions.updateMovie({ id: movieToEdit._id, updateData: movieData })
                ).unwrap();
            } else {
                await dispatch(moviesActions.createMovie(movieData)).unwrap();
            }

            alert(`Movie ${movieToEdit ? "updated" : "created"} successfully!`);
            navigate("/movies");
        } catch (error) {
            console.error("Error saving movie:", error);
            alert("Failed to save the movie. Please try again.");
        }
    };

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.formTitle}>{movieToEdit ? "Update Movie" : "Add Movie"}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <input
                    {...register("title", { required: "Title is required" })}
                    type="text"
                    placeholder="Title"
                    className={styles.input}
                />
                {errors.title && <p className={styles.error}>{errors.title.message}</p>}

                <textarea
                    {...register("description")}
                    placeholder="Description"
                    className={styles.textarea}
                />

                <input
                    {...register("actors", { required: "Actors are required" })}
                    type="text"
                    placeholder="Actors (comma-separated)"
                    className={styles.input}
                />
                {errors.actors && <p className={styles.error}>{errors.actors.message}</p>}

                <input
                    {...register("director")}
                    type="text"
                    placeholder="Director"
                    className={styles.input}
                />

                <input
                    {...register("genre", { required: "Genre is required" })}
                    type="text"
                    placeholder="Genre (comma-separated)"
                    className={styles.input}
                />
                {errors.genre && <p className={styles.error}>{errors.genre.message}</p>}

                <input
                    {...register("image")}
                    type="text"
                    placeholder="Image URL"
                    className={styles.input}
                />

                <input
                    {...register("releaseDate", {
                        required: "Release date is required",
                        pattern: {
                            value: /^\d{4}-\d{2}-\d{2}$/,
                            message: "Date must be in the format YYYY-MM-DD",
                        },
                    })}
                    type="text"
                    placeholder="Release Date (YYYY-MM-DD)"
                    className={styles.input}
                />
                {errors.releaseDate && <p className={styles.error}>{errors.releaseDate.message}</p>}

                <input
                    {...register("rating", {
                        required: "Rating is required",
                        min: { value: 1, message: "Rating must be at least 1" },
                        max: { value: 10, message: "Rating cannot exceed 10" },
                        validate: (value) => /^[0-9]+(\.[0-9]{1,2})?$/.test(value.toString()) || "Rating must be a number with up to 2 decimal places",
                    })}
                    type="number"
                    placeholder="Rating (1-10)"
                    step="0.1"
                    className={styles.input}
                />
                {errors.rating && <p className={styles.error}>{errors.rating.message}</p>}

                <button type="submit" className={styles.button} disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : movieToEdit ? "Update Movie" : "Add Movie"}
                </button>
            </form>
        </div>
    );
};

export default CreateMovieComponent;
