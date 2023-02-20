import React from 'react';
import { Link } from "react-router-dom";


export default function Nav () {
        return (
            <div className="sf-nav-container">
                <ul className="sf-nav">
                    <li><Link to="/continue">Continue</Link></li>
                </ul>
            </div>
        )
}