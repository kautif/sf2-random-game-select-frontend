import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaRandom } from "react-icons/fa";
import { AiOutlineOrderedList, AiOutlineSearch } from "react-icons/ai";
import { ImExit } from "react-icons/im";
import "./AuthNav.css";

let screenWidth = window.screen.width;


export default function AuthNav (props) {
    const desktopMenu = <div className="sf2__authnav">
    <Link className="sf2__authnav__item" to="/user/random_select">Random Select</Link>
    <Link className="sf2__authnav__item" to="/user/find_game">Find Game</Link> 
    <Link className="sf2__authnav__item" to="/user">Games List</Link>
    <Button type="submit" variant="danger" onClick={props.logout}>Logout</Button>
</div>

const mobileMenu = <div className="sf2__authnav">
<Link className="sf2__authnav__item" to="/user/random_select"><FaRandom className="sf2__authnav__item__icon"></FaRandom></Link>
<Link className="sf2__authnav__item" to="/user/find_game"><AiOutlineSearch className="sf2__authnav__item__icon"></AiOutlineSearch></Link> 
<Link className="sf2__authnav__item" to="/user"><AiOutlineOrderedList className="sf2__authnav__item__icon"></AiOutlineOrderedList></Link>
<Button type="submit" variant="danger" className="logout-btn" onClick={props.logout}><ImExit className="sf2__authnav__item__icon"></ImExit></Button>
</div>
    return (
        <div className={window.location.pathname === "/user/random_select" ? "sf2__authnav-container__alt" : "sf2__authnav-container"}>
            {/* <div className="sf2__authnav">
                <p className="sf2__authnav__item">Logged in as {props.username}</p>
                <Link className="sf2__authnav__item" to="/user/random_select">Random Select</Link>
                <Link className="sf2__authnav__item" to="/user/find_game">Find Game</Link> 
                <Link className="sf2__authnav__item" to="/user">Games List</Link>
                <Button type="submit" variant="danger" onClick={props.logout}>Logout</Button>
            </div> */}
            {screenWidth <= 425 ? mobileMenu : desktopMenu}
        </div>
    )
}