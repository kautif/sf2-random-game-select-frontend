import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../../../UserContext';
import "./AuthNav.css";

export default function AuthNav (props) {
    return (
        <div className={window.location.pathname === "/user/random_select" ? "sf2__authnav-container__alt" : "sf2__authnav-container"}>
            <div className="sf2__authnav">
                <p>Logged in as {props.username}</p>
                <Link to="/user/random_select">Random Select</Link>
                <Link to="/user/find_game">Find Game</Link> 
                <Link to="/user">Games List</Link>
                <Button type="submit" variant="danger" onClick={props.logout}>Logout</Button>
            </div>
        </div>
    )
}