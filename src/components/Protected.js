import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";

const Protected = ({ Component }) => {
    const navigate = useNavigate();

    const user = useSelector(selectUser);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }

        //eslint-disable-next-line
    }, []);

    return (
        <div>
            <Component />
        </div>
    );
};

export default Protected;
