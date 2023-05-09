import React, { useEffect, useState } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Nav = () => {
    const [show, setShow] = useState(false);

    const transitionNavbar = () => {
        if (window.scrollY > 100) {
            setShow(true);
        } else {
            setShow(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", transitionNavbar);

        return () => {
            window.removeEventListener("scroll", transitionNavbar);
        };
    }, []);

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <div className="nav__contents">
                <Link to="/home">
                    <img
                        className="nav__logo"
                        src="/images/netflix_logo.png"
                        alt=""
                    />
                </Link>
                <div>
                    <Link to="/search">
                        <IconButton className="nav__search">
                            <SearchIcon />
                        </IconButton>
                    </Link>
                    <Link to="/profile">
                        <img
                            className="nav__avatar"
                            src="/images/netflix_avatar.png"
                            alt=""
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Nav;
