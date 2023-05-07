import React, { useEffect, useState } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

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
                <Link to="/profile">
                    <img
                        className="nav__avatar"
                        src="/images/netflix_avatar.png"
                        alt=""
                    />
                </Link>
            </div>
        </div>
    );
};

export default Nav;
