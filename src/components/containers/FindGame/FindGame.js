import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../../UserContext";

import AuthNav from "../AuthNav/AuthNav";
import axios from "axios";
import "./FindGame.css";
import { Button } from "react-bootstrap";

export default function FindGame () {
    const { userInfo } = useContext(UserContext);
    const { email, setEmail, password, setPassword, login, setLogin, userEmail, setUserEmail } = userInfo;
    const [search, setSearch] = useState("");
    const [games, setGames] = useState([]);
    function getGames (e) {
        e.preventDefault();
        axios({
            url: `https://api.rawg.io/api/games?search=${search}&key=${process.env.REACT_APP_RAWG_API_KEY}`,
            method: "GET",
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            console.log("rawg res: ", response);
            setGames(prevGames => {
                return response.data.results;
            });
        }).catch(err => {
            console.log("RAWG Error: ", err);
        })
    }

    let retrievedGames = games.map((game, i) => {
        return  <div className="sf2-find-game__result" key={i}>
                    <h2>{game.name}</h2>
                    <img src={`${game.background_image !== null 
                                    ? game.background_image 
                                    : "https://cdn4.iconfinder.com/data/icons/nintendo-console-glyph-set/32/ico-fill-nes-cartridge-512.png"}`} alt={game.name + " cover art"} />
                    <Button onClick={() => addGame(game.name, game.background_image)}>Add Game</Button>
                </div>
    })

    let gamesArr = [];
    function addGame (gameName, gameImg) {
        const localData = JSON.parse(window.localStorage.getItem('email'));
        let gameObj = {
            name: gameName,
            img_url: gameImg,
            votes: 1
        }
        gamesArr.push(gameObj)
        let config = {
            method: "post",
            url: "http://localhost:4000/addgame",
            data: {
                localData,
                games: gameObj
            }
        }

        axios(config)
            .then(result => {
                console.log("addGame: ", result);            
            })
            .catch(error => {
                console.log("addGame error: ", error);
            })
    }

    useEffect(() => {
        const localData = window.localStorage.getItem('email');
        setUserEmail(JSON.parse(localData));
        console.log("localData: ", localData);
    }, [email])

    return (
        <div className="sf2-findgame__container">
            <AuthNav username={userEmail && userEmail.substring(0, userEmail.indexOf("@"))} />
            <h1>Find a Game</h1>
            <form onSubmit={(e) => getGames(e)}>
                <input type="text"  placeholder="Look for a game..." value={search} onChange={(e) => setSearch(e.target.value)}/>
                <Button onClick={(e) => getGames(e)}>Submit</Button>
            </form>
            <div className="sf2-find-game__allresults">
                {retrievedGames}
            </div>
        </div>
    )
}