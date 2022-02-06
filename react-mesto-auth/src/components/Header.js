import React from "react";
import logo from "../images/logo.svg";

function Header(props) {
    return (
        <header className="header">
            <div className="header__container">
                <img alt="Logo" className="header__logo" src={logo} />
                {props.children}
            </div>
            <div className="header__line"></div>
        </header>
    );
}

export default Header;
