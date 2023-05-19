import React, { useRef } from "react";
import "./SignupScreen.css";
import { auth } from "../firebase";
import {
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    setPersistence,
    signInWithEmailAndPassword,
} from "firebase/auth";

const SignUpScreen = ({ email }) => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const signupUser = async (e) => {
        e.preventDefault();

        setPersistence(auth, browserSessionPersistence)
            .then(async () => {
                try {
                    return await createUserWithEmailAndPassword(
                        auth,
                        emailRef.current.value,
                        passwordRef.current.value
                    );
                } catch (error) {
                    return alert(error.message);
                }
            })
            .catch((error) => alert(error.message));
    };

    const loginUser = (e) => {
        e.preventDefault();

        setPersistence(auth, browserSessionPersistence)
            .then(async () => {
                try {
                    return await signInWithEmailAndPassword(
                        auth,
                        emailRef.current.value,
                        passwordRef.current.value
                    );
                } catch (error) {
                    return alert(error.message);
                }
            })
            .catch((error) => alert(error.message));
    };

    return (
        <div className="signupScreen">
            <form>
                <h1>Sign In</h1>
                <input
                    type="email"
                    placeholder="Email Address"
                    defaultValue={email}
                    ref={emailRef}
                />
                <input
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                />
                <button type="submit" onClick={loginUser}>
                    Sign In
                </button>
                <h4>
                    <span className="signupScreen__gray">New to Netflix? </span>
                    <span onClick={signupUser} className="singupScreen__signup">
                        Sign up now.
                    </span>
                </h4>
            </form>
        </div>
    );
};

export default SignUpScreen;
