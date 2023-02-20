import React from 'react';
import { BrowserRouter as Router, Route, Link, BrowserRouter, Switch } from "react-router-dom";
import CoverComponent from './components/containers/Cover/CoverComponent';
import Continue from './components/containers/Continue/Continue';
import Auth from './components/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import FindGame from './components/containers/FindGame/FindGame';
import Gameslist from './components/containers/Gameslist/Gameslist';
import RandomSelect from './components/containers/RandomSelect/RandomSelect';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={CoverComponent}></Route>
        <Route path="/continue" component={Continue}></Route>
        <ProtectedRoute exact path="/user" component={ Auth } />
        <ProtectedRoute path="/user/find_game" component={ FindGame } />
        <ProtectedRoute path="/user/gameslist" component={ Gameslist } />
        <ProtectedRoute path="/user/random_select" component={RandomSelect} />
      </Router>
    </div>
  );
}

export default App;