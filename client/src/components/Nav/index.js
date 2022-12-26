import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

    function showNavigation() {
        if (Auth.loggedIn()) {
        return (
            <ul className="flex-row">
            <li className="mx-1">
                <a href="/" onClick={() => Auth.logout()}>
                Logout
                </a>
            </li>
            </ul>
        );
        } else {
        return (
            <ul className="flex-row">
            <li className="mx-1">
                <Link to="/signup">
                Signup
                </Link>
            </li>
            <li className="mx-1">
                <Link to="/login">
                Login
                </Link>
            </li>
            </ul>
        );
        }
    }

    return (
        <header className="headerBar">
        <h1 className="clockinandout-Title">
            <Link to="/">
            Clock In, Clock Out
            </Link>
        </h1>
        <nav>
            {showNavigation()}
        </nav>
        </header>
    );
}

export default Nav;