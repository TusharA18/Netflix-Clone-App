import React, { useEffect, useState } from "react";
import "./Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { selectModalMovie, unSetModal } from "../features/modal/modalSlice";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "../api/axios";
import Youtube from "react-youtube";

const Modal = () => {
    const API_KEY = process.env.REACT_APP_API_KEY;

    const dispatch = useDispatch();

    const [trailer, setTrailer] = useState("");

    const modalMovie = useSelector(selectModalMovie);

    const toggleModal = () => {
        dispatch(unSetModal());
    };

    const fetchMovie = async () => {
        const { data } = await axios.get(
            `/${modalMovie.type}/${modalMovie.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
        );

        if (data.videos && data.videos.results) {
            let search_trailer = data.videos.results.find(
                (vid) => vid.type === "Trailer"
            );

            !search_trailer &&
                (search_trailer = data.videos.results.find(
                    (vid) => vid.type === "Teaser"
                ));

            setTrailer(
                search_trailer ? search_trailer : data.videos.results[0]
            );
        }
    };

    useEffect(() => {
        fetchMovie();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="modal">
            <div onClick={toggleModal} className="modal__overlay" />
            <div className="modal__contents">
                <div className="modal__header">
                    <h2 className="modal__title">
                        {modalMovie?.name ||
                            modalMovie?.title ||
                            modalMovie?.original_name}
                    </h2>
                    <Button
                        onClick={toggleModal}
                        className="modal__closeButton"
                    >
                        <CloseIcon /> Close
                    </Button>
                </div>
                <p className="modal__description">{modalMovie?.overview}</p>
                <Youtube
                    videoId={trailer && trailer.key}
                    className={"modal__youtube"}
                    opts={{
                        height: "390",
                        width: "100%",
                        playerVars: {
                            autoplay: 0,
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default Modal;
