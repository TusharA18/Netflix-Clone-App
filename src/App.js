import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { loginUser, logoutUser } from "./features/user/userSlice";
import ProfileScreen from "./components/ProfileScreen";
import SearchScreen from "./components/SearchScreen";
import { selectModalView } from "./features/modal/modalSlice";
import Modal from "./components/Modal";
import Protected from "./components/Protected";

const App = () => {
    const dispacth = useDispatch();

    const navigate = useNavigate();

    const modalView = useSelector(selectModalView);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
            if (userAuth) {
                dispacth(
                    loginUser({ uid: userAuth.uid, email: userAuth.email })
                );

                navigate("/home");
            } else {
                dispacth(logoutUser());

                navigate("/login");
            }
        });

        return unsubscribe;

        //eslint-disable-next-line
    }, [dispacth]);

    return (
        <div className="app">
            <Routes>
                <Route
                    exact
                    path="/home"
                    element={<Protected Component={HomeScreen} />}
                />
                <Route exact path="/login" element={<LoginScreen />} />
                <Route
                    exact
                    path="/profile"
                    element={<Protected Component={ProfileScreen} />}
                />
                <Route
                    exact
                    path="/search"
                    element={
                        <>
                            <SearchScreen />
                            {modalView && <Modal />}
                        </>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
