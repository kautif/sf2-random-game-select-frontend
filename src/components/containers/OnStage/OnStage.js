import React from 'react';
import "./OnStage.css";

export default function OnStageComponent (props) {
    console.log(props);
    return (
        <div className="on-stage">
            <h1 id="stage-name" class="game-names">{props.stageName}</h1>
            <img id="on-stage-img" class="game-images" src={props.stage}/>
            <div className="on-stage__votes-container">
                <h1 id="vote-ratio" class="game-votes"><span id="game-vote">{props.votes}</span> votes out of <span id="vote-total">{props.total}</span></h1>
                <h1 id="stage-stats" class="game-totals">Win Chance: {props.stats}%</h1>
            </div>
        </div>
    )
}