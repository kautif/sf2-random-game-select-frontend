import React, {useEffect, useState} from 'react';
import soundFile from '../../../sounds/sf2_char_select.mp3';
import "./MusicUI.css";

function handleMusic () {
    document.getElementById("audio-play").play();
    document.getElementById("audio-play").volume = 0.2;
}

function pauseMusic () {
    document.getElementById("audio-play").pause();
}

function stopMusic () {
    document.getElementById("audio-play").pause();
    document.getElementById("audio-play").currentTime = 0;
}

export default function MusicComponent () {
    const [finished, setFinished] = useState(false);
    useEffect(() => {
        document.getElementById("audio-play").play();
    }, [])
    
    return (
        <div className="music-container">
            {document.getElementById("audio-play") && handleMusic()}
            <audio id="audio-play" src={soundFile} loop="loop" autoPlay onPlay={() => document.getElementById("audio-play").volume = 0.25}></audio>
            <i className="fas fa-play"  onClick={() => handleMusic()}></i>
            <i className="fas fa-pause" onClick={() => pauseMusic()}></i>
            <i className="fas fa-stop" onClick={() => stopMusic()}></i>
        </div>
    )
}