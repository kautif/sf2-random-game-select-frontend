import React from 'react';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import "./Continue.css"

export default function Continue () {
    return (
        <div className="sf2__cont__container">
            <div className="sf2__cont__fields">
                <SignUp />  
                <Login />
            </div>
        </div>
    )
}