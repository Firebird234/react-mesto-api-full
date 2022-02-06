import React from "react";
import reactDom from "react-dom";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../Nav/NavButton.css";

function NavButton(props) {
    const history = useNavigate();

    function handleClick() {
        props.loggedIn && props.onClick();
        history(props.redirect);
    }
    return (
        <div className="nav">
            <input id="menu-toggle" type="checkbox" />
            <label className="menu-btn" htmlFor="menu-toggle">
                <span></span>
            </label>
            <div className="nav__container">
                {props.email && props.email}
                <button onClick={handleClick} className="nav__button">
                    {props.buttonText}
                </button>
            </div>
        </div>
    );
}

export default NavButton;
