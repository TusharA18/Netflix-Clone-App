import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { loginUser, logoutUser } from "./features/user/userSlice";
import ProfileScreen from "./components/ProfileScreen";

const App = () => {
    const dispacth = useDispatch();

    const navigate = useNavigate();

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
    }, [dispacth]);

    return (
        <div className="app">
            <Routes>
                <Route exact path="/" element={<Navigate to="/home" />} />
                <Route exact path="/home" element={<HomeScreen />} />
                <Route exact path="/login" element={<LoginScreen />} />
                <Route exact path="/profile" element={<ProfileScreen />} />
            </Routes>
        </div>
    );
};

export default App;
