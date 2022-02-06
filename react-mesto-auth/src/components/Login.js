import React from "react";
import reactDom from "react-dom";
import AuthRegForm from "./AuthRegForm/AuthRegForm";
import "./AuthRegForm/AuthRegForm.css";

function LogIn(props) {
    const [inputValues, setInputValues] = React.useState({
        logInEmail: "",
        logInPassword: "",
    });

    const handleChange = (event) => {
        setInputValues({
            ...inputValues,
            [event.target.name]: event.target.value,
        });
        // props.handleValidity(event.target);
    };

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit(inputValues);
    }

    return (
        <AuthRegForm
            onSubmit={handleSubmit}
            formText="Вход"
            buttonText="Войти"
            name="logIn"
            regLink=""
            children={
                <>
                    <input
                        type="email"
                        onChange={handleChange}
                        value={inputValues.logInEmail || ""}
                        className="authRegForm__field"
                        placeholder="Email"
                        name="logInEmail"
                        id="logInEmail"
                        required
                        minLength="2"
                        maxLength="40"
                    />
                    <span className="error" id="name-error">
                        {/* {props.validity.message.editName} */}
                    </span>
                    <input
                        value={inputValues.logInPassword || ""}
                        type="password"
                        onChange={handleChange}
                        className="authRegForm__field"
                        name="logInPassword"
                        placeholder="Пароль"
                        id="logInPassword"
                        required
                        minLength="2"
                        maxLength="200"
                    />
                    <span className="error" id="profession-error">
                        {/* {props.validity.message.editDescription} */}
                    </span>
                </>
            }
        />
    );
}

export default LogIn;
