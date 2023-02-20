import React from 'react';
// import sf_logo from '../img/sf_logo.png';
// import sf_intro from '../img/SF2-Intro-no-loop.gif';
import sf_logo from '../../../img/sf_logo.png';
import sf_intro from '../../../img/SF2-Intro-no-loop.gif';
import sf_theme from '../../../sounds/sf2_theme.mp3';
import sf_coin from '../../../sounds/sf_coin.mp3';
import './Cover.css';

import { BrowserRouter as Router, Route, Link, BrowserRouter, Switch, useHistory } from "react-router-dom";
import Nav from '../../Nav';

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= 0.1;
    }, 2000);
}

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += 0.1;
    }, 100);
}

let showStart = true;
let repeat = true;
let flashStart = function () {
    if (repeat) {
        if (showStart) {
            fade(document.getElementsByClassName("cover-start")[0])
            showStart = false;
            setTimeout(function () {
                flashStart();
            }, 1000)
        } else {
            unfade(document.getElementsByClassName("cover-start")[0])
            showStart = true;
            setTimeout(function () {
                flashStart();
            }, 1000)
        }
    } else {
        return;
    }
}

function startIntro () {
    document.getElementsByClassName('cover-start')[0].style.visibility = 'hidden';
    document.getElementsByClassName('sf-intro')[0].style.display = 'block';
    document.getElementById('cover-theme').volume = 0.35;
    document.getElementById('cover-theme').play();
    setTimeout(function () {
        document.getElementsByClassName('cover-logo-container')[0].style.transition = '1000ms';
        unfade(document.getElementsByClassName('cover-logo-container')[0])
        document.getElementsByClassName('cover-logo-container')[0].style.width = '100%';
        document.getElementsByClassName('cover-logo-container')[0].style.display = 'flex';
        repeat = false;
    }, 7000)
}

function playCoin () {
    document.getElementById('cover-coin').play();
    // let gamesContainer = document.getElementsByClassName('games-container')[0];
    // gamesContainer.style.width = window.outerWidth + 'px';
}

export default function CoverComponent () {
        return (
            <div className="cover" onLoad={() => flashStart()}>
                <img className="sf-intro" src={sf_intro} alt="street fighter intro gif" loop="false" />
                <h1 className="cover-start" onClick={() => startIntro()}>Press Start</h1>
                <audio id="cover-theme" src={sf_theme}></audio>
                <div className="cover-logo-container">
                    <div>
                        <img src={sf_logo} alt="street fighter logo" />
                    </div>
                    <div>
                        <h1 className="cover-logo">Random Game</h1>
                        <h1 className="cover-logo cover-select">Select</h1>
                    </div>
                    <div className="cover-continue">
                        <Link to="/continue"><h1 onClick={playCoin}>Continue</h1></Link>
                        {/* <ul className="sf-nav">
                            <li><Link to="/continue">Continue</Link></li>
                        </ul> */}
                        <audio id="cover-coin" src={sf_coin}></audio>
                    </div>
                </div>
            </div>
        )
}