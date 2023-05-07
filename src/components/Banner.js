import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "../api/axios";
import requests from "../api/Request";

const Banner = () => {
    const [movie, setMovie] = useState([]);

    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        const fetchMovie = async () => {
            const request = await axios.get(requests.fetchNetflixOriginals);

            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
        };

        fetchMovie();
    }, []);

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n) + "..." : string;
    };

    return (
        movie.backdrop_path && (
            <header
                className="banner"
                style={{
                    backgroundImage: `url("${IMAGE_BASE_URL}${movie?.backdrop_path}")`,
                    backgroundPosition: "center 20%",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="banner__contents">
                    <h1 className="banner__title">
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>
                    <div className="banner__buttons">
                        <button className="banner__button">Play</button>
                        <button className="banner__button">My List</button>
                    </div>
                    <h1 className="banner__description">
                        {truncate(`${movie?.overview}`, 150)}
                    </h1>
                </div>

                <div className="banner--fadeBottom" />
            </header>
        )
    );
};

export default Banner;
