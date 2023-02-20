import React, {useContext, useEffect, useState} from "react";
import AuthNav from "../AuthNav/AuthNav";
import axios from "axios";
import UserContext from "../../../UserContext";
import { getDefaultNormalizer } from "@testing-library/react";
import { Button, Form } from "react-bootstrap";
import "./Gameslist.css";

let allGames;
let gamesListArr = [];

export default function Gameslist () {
    const { userInfo } = useContext(UserContext);
    const { email, setEmail, 
            password, setPassword, 
            login, setLogin, 
            userEmail, setUserEmail, 
            userGames, setUserGames } = userInfo;

    const localData = window.localStorage.getItem('email');
    const localDataEmail = JSON.parse(localData);
    const backendURL = process.env.REACT_BACKEND || "http://localhost:4000"

    async function getGames() {
        await axios(backendURL + "/getgames", {
            params: {
                email: localDataEmail
            }
        }).then(result => {
            allGames = result.data.response.games;
            allGames.map(game => {
                setUserGames(prevUserGames => {
                    return [...prevUserGames, game];
                })
            })
        }).catch(err => {
            console.log("Error: no games found");
        })
    }

    // 1/31/23: To calculate the running_total for each game and update the positions array, you'll need to do the following:
        // Set the running total equal to the total votes of all games up and including the current game, but no further
        // Run a loop based on the current game's amount of votes
            // Positions will start at the running_total (including the current game's votes) minus the current game's votes plus 1. 
            // How ever many votes there are for the current game, that's how many positions there will be in the current game's array. 
                // Each position will need to be added individually

    async function setVoteTotals(gamesObjs) {
        // for (let z = 0; z < gamesObjs.length; z++) {
        //     gamesObjs[z].positions.length = 0;
        //     if (z === 0) {
        //         nextTotal = parseInt(gamesObjs[z].votes);
        //         gamesObjs[z].running_total = nextTotal;
        //         for (let k = 0; k < parseInt(gamesObjs[z].votes); k++) {
        //             gamesObjs[z].positions.push(parseInt(gamesObjs[z].votes) - k);
        //         }
        //         gamesObjs[z].positions.sort();
        //     } 
        //     else {
        //         nextTotal += parseInt(gamesObjs[z].votes);
        //         gamesObjs[z].running_total = nextTotal;
        //         for (let k = nextTotal - gamesObjs[z].votes; k < gamesObjs[z].running_total; k++) {
        //             gamesObjs[z].positions.push(k + 1);
        //         }
        //     }
        // }
    }

    async function updateVotes (e, gameName, gameVotes) {
        e.preventDefault();
        let assignedVotes;

        if (e.target.tagName === "FORM") {
            assignedVotes = e.target.children[1].value;
        } else {
            assignedVotes = e.target.parentElement.previousSibling.value;
        }

        if (assignedVotes !== "") {
            const config = {
                method: "put",
                url: "http://localhost:4000/updatevotes",
                data: {
                    email: localDataEmail,
                    games: {
                        name: gameName,
                        votes: assignedVotes,
                        oldVotes: gameVotes
                    }
                }
            }

        await axios(config)
            .then(result => {
                console.log("update votes result: ", result);
            }).catch(err => {
                console.log("update vote Error: ", err);
            })
        } else {
            alert("Input field cannot be empty. Please enter a number. Thanks.");
            return;
        }
    }

    async function deleteGame (e, gameName) {
        e.preventDefault();
        const config = {
            method: "delete",
            url: "http://localhost:4000/deletegame",
            data: {
                email: localDataEmail,
                games: {
                    name: gameName
                }
            }
        }

       await axios(config)
            .then(result => {
                console.log("deleted game: ", result);
            }).catch(err => {
                console.log("deletion failed: ", err);
            })
    }

    useEffect(() => {
        getGames();
    }, [])

    const arrangedGames = userGames.map((game, i) => {
        return (
        
            <div className="gameslist__game" key={"gameslist-game-" + i}>
                <h2 className="gameslist__game__title">{game.name}</h2>
                <img src={game.img_url} alt={game.name + " cover"} className="gameslist__game__img"/>
                <div className="gameslist__game__votes-container">
                    <h3>Current Votes</h3>
                    <p className="gameslist__game__votes">{game.votes}</p>
                </div>
                <Form onSubmit={(e) => {updateVotes(e, game.name, game.votes); window.location.reload();}}>
                    <Form.Label className="gameslist__game__votes-label">Change To</Form.Label>
                    <Form.Control
                        className="gameslist__game__votes" 
                        type="number"
                        placeholder="Update to desired number of votes. Numbers only"
                        />
                    <div className="gameslist__game__buttons">
                        <Button onClick={(e) => {updateVotes(e, game.name, game.votes); window.location.reload(); }}>Submit</Button>
                        <Button onClick={(e) => {deleteGame(e, game.name); window.location.reload(); }}>Delete</Button>
                    </div>
                </Form>
            </div>
        )
     })

    return (
            <div className="sf2-gameslist-container">
                <h1>Current Gameslist</h1>
                <div className="sf2-gameslist__allgames">
                    {arrangedGames}
                </div>
            </div>
    )
}