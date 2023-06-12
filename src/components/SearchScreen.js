import React, { useState } from "react";
import "./SearchScreen.css";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  selectModalView,
  setModal,
  unSetModal,
} from "../features/modal/modalSlice";

const SearchScreen = () => {
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("");
  const [movies, setMovies] = useState([]);

  const dispatch = useDispatch();

  const modalView = useSelector(selectModalView);

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";

  const fetchMovie = async () => {
    const request = await axios.get(`/search/${select.toLowerCase()}`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        query: input,
      },
    });

    setMovies(request.data.results);
  };

  const handleSubmit = (e) => {
    if (!input || !select) {
      return;
    }

    e.preventDefault();

    fetchMovie();
  };

  const toggleModal = (movie) => {
    if (!modalView) {
      const newMovie = { ...movie, type: select.toLowerCase() };

      dispatch(setModal(newMovie));
    } else {
      dispatch(unSetModal());
    }

    setInput("");

    setSelect("");
  };

  return (
    <div className="searchScreen">
      <Link to="/home">
        <IconButton className="searchScreen__close">
          <CloseIcon />
        </IconButton>
      </Link>
      <div className="searchScreen__input">
        <form>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type here..."
            required
          />
          <div className="searchScreen__inputFormat">
            <select
              className="searchScreen__select"
              required
              value={select}
              onChange={(e) => setSelect(e.target.value)}
            >
              <option value="" style={{ display: "none" }}>
                Select a option
              </option>
              <option value="Movie">Movie</option>
              <option value="TV">TV Show</option>
            </select>
            <button
              className="searchScreen__button"
              type="submit"
              onClick={handleSubmit}
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="searchScreen__body">
        {movies.length ? (
          <h2 className="searchScreen__title">The Results are : </h2>
        ) : (
          <h2 className="searchScreen__title">No result found!</h2>
        )}
        {movies.map(
          (movie) =>
            movie.backdrop_path && (
              <img
                onClick={() => toggleModal(movie)}
                className="searchScreen__image"
                key={movie.id}
                src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
                alt={movie?.name || movie?.title || movie?.original_name}
              />
            )
        )}
      </div>
    </div>
  );
};

export default SearchScreen;
