import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "../api/axios";

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
    const [movies, setMovies] = useState([]);

    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        const fetchMovie = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
        };

        fetchMovie();
    }, [fetchUrl]);
    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {movies.map(
                    (movie) =>
                        ((isLargeRow && movie.poster_path) ||
                            (!isLargeRow && movie.backdrop_path)) && (
                            <img
                                className={`row__poster ${
                                    isLargeRow && "row__posterLarge"
                                }`}
                                key={movie.id}
                                src={`${IMAGE_BASE_URL}${
                                    isLargeRow
                                        ? movie?.poster_path
                                        : movie?.backdrop_path
                                }`}
                                alt=""
                            />
                        )
                )}
            </div>
        </div>
    );
};

export default Row;
