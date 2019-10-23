import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './containers/HomePage'
import Details from './containers/Details'

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="header">
          GIF Search
        </h1>
        <Switch>
          <Route path="/details/:gif_id">
            <Details />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
