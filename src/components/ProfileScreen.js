import React from "react";
import "./ProfileScreen.css";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const ProfileScreen = () => {
    const user = useSelector(selectUser);

    return (
        <div className="profileScreen">
            <Nav />
            <div className="profileScreen__body">
                <h1>Edit Profile</h1>
                <div className="profileScreen__info">
                    <img src="/images/netflix_avatar.png" alt="" />
                    <div className="profileScreen__details">
                        <h2>{user ? user.email : "Anonymous User"}</h2>
                        <button
                            onClick={() => {
                                signOut(auth);
                            }}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;
