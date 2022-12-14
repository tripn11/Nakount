import React from 'react';
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase";

export default () => {
    const navigate = useNavigate();

    const logout = () => {
        signOut(auth);
        navigate("/login")
    }

    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}



