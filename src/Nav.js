
import './App.css';
import './RegistrationForm.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";

import React from 'react';

function Nav() {
  return (
    <nav>
        <h3>TKxel</h3>
        <ul className="nav-links">
            <Link to="/home">
            <li>Home</li>
            </Link>
            <Link to="/About">
            <li>About</li>
            </  Link>
            <Link to="/Shop">
            <li>Shop </li>
            </  Link>
        </ul>
    </nav>
  );
}

export default Nav;