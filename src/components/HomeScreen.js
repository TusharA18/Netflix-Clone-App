import React from "react";
import "./HomeScreen.js";
import Nav from "./Nav";
import Banner from "./Banner";
import Row from "./Row.js";
import requests from "../api/Request.js";
import { useSelector } from "react-redux";
import { selectModalView } from "../features/modal/modalSlice.js";
import Modal from "./Modal.js";

const HomeScreen = () => {
    const modalView = useSelector(selectModalView);

    return (
        <div className="homeScreen">
            <Nav />
            <Banner />

            <Row
                type="tv"
                title="NETFLIX ORIGINALS"
                fetchUrl={requests.fetchNetflixOriginals}
                isLargeRow
            />
            <Row
                type="movie"
                title="Trending"
                fetchUrl={requests.fetchTrending}
            />
            <Row
                type="movie"
                title="Top Rated"
                fetchUrl={requests.fetchTopRated}
            />
            <Row
                type="movie"
                title="Action Movies"
                fetchUrl={requests.fetchActionMovies}
            />
            <Row
                type="movie"
                title="Comedy Movies"
                fetchUrl={requests.fetchComedyMovies}
            />
            <Row
                type="movie"
                title="Romance Movies"
                fetchUrl={requests.fetchRomanceMovies}
            />
            <Row
                type="movie"
                title="Horror Movies"
                fetchUrl={requests.fetchHorrorMovies}
            />
            <Row
                type="movie"
                title="Documentaries"
                fetchUrl={requests.fetchDocumentaries}
            />
            {modalView && <Modal />}
        </div>
    );
};

export default HomeScreen;
