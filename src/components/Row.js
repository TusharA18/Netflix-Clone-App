import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import {
    selectModalView,
    setModal,
    unSetModal,
} from "../features/modal/modalSlice";

const Row = ({ title, fetchUrl, type, isLargeRow = false }) => {
    const dispatch = useDispatch();

    const modalView = useSelector(selectModalView);

    const [movies, setMovies] = useState([]);

    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        const fetchMovie = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
        };

        fetchMovie();
    }, [fetchUrl]);

    const toggleModal = (movie) => {
        if (!modalView) {
            const newMovie = { ...movie, type: type };

            dispatch(setModal(newMovie));
        } else {
            dispatch(unSetModal());
        }
    };
    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {movies.map(
                    (movie) =>
                        ((isLargeRow && movie.poster_path) ||
                            (!isLargeRow && movie.backdrop_path)) && (
                            <img
                                onClick={() => toggleModal(movie)}
                                className={`row__poster ${
                                    isLargeRow && "row__posterLarge"
                                }`}
                                key={movie.id}
                                src={`${IMAGE_BASE_URL}${
                                    isLargeRow
                                        ? movie.poster_path
                                        : movie.backdrop_path
                                }`}
                                alt={
                                    movie?.name ||
                                    movie?.title ||
                                    movie?.original_name
                                }
                            />
                        )
                )}
            </div>
        </div>
    );
};

export default Row;
