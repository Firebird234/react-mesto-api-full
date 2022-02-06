import React from "react";
import reactDom from "react-dom";
import AuthRegForm from "./AuthRegForm/AuthRegForm";
import "./AuthRegForm/AuthRegForm.css";

function Register(props) {
    const [inputValues, setInputValues] = React.useState({
        registerEmail: "",
        registerPassword: "",
    });

    const handleChange = (event) => {
        setInputValues({
            ...inputValues,
            [event.target.name]: event.target.value,
        });
        // props.handleValidity(event.target);
        console.log(inputValues);
    };

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit(inputValues);
    }

    return (
        <AuthRegForm
            onSubmit={handleSubmit}
            formText="Регистрация"
            buttonText="Зарегистрироваться"
            name="register"
            redirect="/sign-in"
            regLink="Уже зарегистрированы? Войти"
            children={
                <>
                    <input
                        value={inputValues.registerEmail || ""}
                        type="email"
                        onChange={handleChange}
                        className="authRegForm__field"
                        placeholder="Email"
                        name="registerEmail"
                        id="registerEmail"
                        required
                        minLength="2"
                        maxLength="40"
                    />
                    <span className="error" id="name-error">
                        {/* {props.validity.message.editName} */}
                    </span>
                    <input
                        value={inputValues.registerPassword || ""}
                        type="password"
                        onChange={handleChange}
                        className="authRegForm__field"
                        name="registerPassword"
                        placeholder="Пароль"
                        id="registerPassword"
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

export default Register;
