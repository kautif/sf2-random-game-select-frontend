import React, {useEffect, useContext, useState, useCallback, useRef} from 'react';
import axios from "axios";
import "./RandomSelect.css";

import UserContext from '../../../UserContext';
import OnStageComponent from "../OnStage/OnStage";
import select from '../../../sounds/select_fighter_cut.mp3';
import selected from '../../../sounds/street_fighter_choose.mp3';
import choose from '../../../sounds/street_fighter_choose.mp3';
import MusicComponent from '../MusicUI/MusicComponent';
import coin from "../../../sounds/sf_coin.mp3";
import AuthNav from '../AuthNav/AuthNav';

let votesArr = [];
// let gameIndex = 0;
export default function RandomSelect () {
    const localData = window.localStorage.getItem('email');
    const localDataEmail = JSON.parse(localData);
    const { userInfo } = useContext(UserContext);
    const {userGames, setUserGames,
            userEmail, setUserEmail} = userInfo;
    const [gameIndex, setGameIndex] = useState(0);
    // const [randomCount, setRandomCount] = useState(0);

    async function getGames () {
        await axios("http://localhost:4000/getgames", {
            params: {
                email: localDataEmail
            }
        }).then(result => {
            setUserGames(result.data.response.games);
        }).catch(err => {
            console.error("randomSelect err: ", err)
        })
    }

    let randomGame;
    let preRandoArr = [];

    function preRandomize () {
        for (let i = 0; i < userGames.length - 1; i++) {
            randomGame = Math.floor(Math.random() * (userGames.length - 1) + 1);
            preRandoArr.push(randomGame);
        }
    }

    preRandomize();

    let totalVotes = 0;
    let allVotesArr = [];
    function countAndArrangeVotes () {
        for (let i = 0; i < userGames.length - 1; i++) {
            totalVotes += parseFloat(userGames[i].votes)
            for (let v = 0; v < userGames[i].votes; v++) {
                allVotesArr.push(i);
            }
        }
    }

    if (userGames.length > 0) {
        countAndArrangeVotes();
    }



    function selectWinner() {
        let finalizeWinner = Math.floor(Math.random() * (allVotesArr.length - 1) + 1);
        setGameIndex(allVotesArr[finalizeWinner]);
    }

    function randomSelect() {
        let i = 0;
        function setNextGameIndex() {
            if (i < preRandoArr.length - 1) {
                setGameIndex((prevGameIndex) => {
                    i++;
                    if (i < userGames.length) {
                        setTimeout(setNextGameIndex, 200);
                    }
                    return preRandoArr[i - 1];
                });
                setGameIndex((prevGameIndex) => preRandoArr[i]);
                document.getElementById('select').play();
                document.getElementById('select').currentTime = 0;
            }

            if (i === preRandoArr.length - 1) {
                selectWinner();
                document.getElementById('choose').play();
                document.getElementById('choose').currentTime = 0;
            }
        }
        setNextGameIndex();
    }

    useEffect(() => {
        getGames();
        preRandomize();
    }, [])

    useEffect(() => {
        window.onkeydown = function (e) {
            console.log("number of items in row: ");
            let gameArrEnd = userGames.length - 1;
            let itemsPerRow = Math.floor(document.getElementsByClassName("randomselect__games__container")[0].offsetWidth / document.getElementsByClassName("randomselect__game__img")[0].offsetWidth);

            // 2/9/23: Can't assign values to state otherwise they won't render. 
                // Only pass new value into setter function

                if (e.keyCode === 37 ||
                    e.keyCode === 38 ||
                    e.keyCode === 39 ||
                    e.keyCode === 40) {
                        document.getElementById('select').play();
                        document.getElementById('select').currentTime = 0;
                }

            // right
            if (gameIndex < gameArrEnd 
                    && e.keyCode === 39) {
                setGameIndex(gameIndex + 1);
            }

            // left
            if (gameIndex > 0 && e.keyCode === 37) {
                setGameIndex(gameIndex - 1)
            }

            // up
            if (gameIndex > 0 && e.keyCode === 38) {
                setGameIndex(Math.max(gameIndex - itemsPerRow, 0));
            }

            if (gameIndex < 0) {
                setGameIndex(0);
            }

            // down
            if (gameIndex < gameArrEnd && e.keyCode === 40) {
                setGameIndex(Math.min(gameIndex + itemsPerRow, gameArrEnd))
            }
        }
    }, [userGames, gameIndex])

    return (
        <div className="randomselect">
            <AuthNav username={userEmail && userEmail.substring(0, userEmail.indexOf("@"))} />
            <MusicComponent />
            <div className="randomselect__games__container">
                {/* {document.getElementById("audio-coin") && document.getElementById("audio-coin").play()} */}
                {userGames && userGames.map((game, i) => {
                    for (let v = 0; v < game.votes; v++) {
                        votesArr.push(i);
                    }
                })}
                
                {userGames && userGames.map((game, index) => {
                    return (
                        <div className={`randomselect__game ${gameIndex === index ? "randomselect__game-selected" : ""}`} key={index}>
                            <img className="randomselect__game__img" src={game.img_url} alt={"cover of " + game.name} />
                        </div>
                    )
                })}
                <p id="random-select-btn" onClick={() => {randomSelect(); document.getElementById("audio-coin").play()}}>Random Select</p>
                <audio id="select" src={select}></audio>
                <audio id="selected" src={selected}></audio>
                <audio id="choose" src={choose}></audio>
                <audio id="audio-coin" src={coin}></audio>
            </div>
            {userGames.length && <OnStageComponent 
                stageName={userGames[gameIndex].name}
                stage={userGames[gameIndex].img_url}
                votes={userGames[gameIndex].votes}
                stats={Math.round(userGames[gameIndex].votes / totalVotes * 100)}
                total={totalVotes} />}
        </div>
    )
}