import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { logInOut } from "../../redux/Slices/auth-slice";
import "./Header.css";

export default function Header() {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(state => state.auth);

    const handleLogInOut = () => dispatch(logInOut());

    return (
        <div className='header-container'>
            <button type='button' className='btn btn-primary' onClick={handleLogInOut}>
                {isLoggedIn ? "Logout" : "Login"}
            </button>
        </div>
    )
}
