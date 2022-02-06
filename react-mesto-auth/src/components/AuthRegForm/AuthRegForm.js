import React from "react";
import reactDom from "react-dom";
import { useNavigate } from "react-router-dom";

function AuthRegForm(props) {
    const history = useNavigate();
    function handleLogIn() {
        history(props.redirect);
    }
    return (
        <form
            onSubmit={props.onSubmit}
            className={`authRegForm`}
            name={`${props.name}`}
            id={`form_${props.name}ID`}
        >
            <h2 className="authRegForm__title">{props.formText}</h2>
            {props.children}
            <button
                type="submit"
                className={`authRegForm__submit
                            ${!props.validButton && "ssubmit-invalid"}`}
            >
                {props.buttonText}
            </button>
            {props.regLink && (
                <h3 className="authRegForm__logLink" onClick={handleLogIn}>
                    {props.regLink}
                </h3>
            )}
        </form>
    );
}

export default AuthRegForm;
