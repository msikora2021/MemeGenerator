import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MemeGenerator from "./components/meme-gen.component";
import MemeBoard from "./components/memeBoard.component";
import './App.css'

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Link to="/" className="navbar-brand">Welcome to the Meme Generator</Link>
                        <div className="collpase navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/" className="nav-link">Create a meme</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/memeboard" className="nav-link">Meme Board</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <br/>
                    <Route path="/" exact component={MemeGenerator} />
                    <Route path="/memeboard" component={MemeBoard} />
                </div>
            </Router>
        );
    }
}

export default App;
