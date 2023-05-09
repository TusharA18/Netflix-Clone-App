import React, { useRef, useState } from "react";
import "./LoginScreen.css";
import { Link } from "react-router-dom";
import SignupScreen from "./SignupScreen";

const LoginScreen = () => {
    const [signIn, setSignIn] = useState(false);
    const [input, setInput] = useState("");

    const emailRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        setSignIn(true);
    };

    return (
        <div
            className="loginScreen"
            style={{
                background: `url(${"/images/login_background.jpg"}) center no-repeat`,
                backgroundSize: "cover",
            }}
        >
            <div className="loginScreen__background">
                <Link to="/login">
                    <img
                        src="/images/netflix_logo.png"
                        alt=""
                        className="loginScreen__logo"
                    />
                </Link>
                <button
                    onClick={() => {
                        setSignIn(true);
                    }}
                    className="loginScreen__button"
                >
                    Sign In
                </button>
                <div className="loginScreen__gradient" />
                <div className="loginScreen__body"></div>
            </div>

            {signIn ? (
                <SignupScreen email={emailRef.current.value} />
            ) : (
                <div className="loginScreen__body">
                    <h1>Unlimited films, TV programmes and more.</h1>
                    <h2>Watch anywhere. Cancel at any time.</h2>
                    <h3>
                        Ready to watch? Enter your email to create or restart
                        your membership.
                    </h3>
                    <div className="loginScreen__input">
                        <form>
                            <input
                                type="email"
                                placeholder="Email Address..."
                                value={input}
                                onChange={(e) => {
                                    setInput(e.target.value);
                                }}
                                ref={emailRef}
                            />
                            <button
                                onClick={handleSubmit}
                                className="loginScreen__getStarted "
                            >
                                Get Started
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginScreen;
