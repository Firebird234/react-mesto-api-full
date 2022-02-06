import React from "react";
import reactDom from "react-dom";
import success from "../../images/Union.png";
import fail from "../../images/Union-Err.png";
import "../InfoToolTip/InfoTooltip.css";

function InfoTooltip(props) {
    return (
        <article
            // onMouseUp={this.handleOverlay}
            className={`popup ${props.isOpened && "popup_opened"}`}
        >
            <div className="popup__container">
                <img
                    className="popup__image"
                    src={props.success ? success : fail}
                    alt={
                        props.success
                            ? "Вы зарегистрировались"
                            : "Что то пошло не так"
                    }
                />
                <h3 className="popup__text">
                    {props.success
                        ? "Вы успешно зарегистрировались!"
                        : "Что-то пошло не так!Попробуйте ещё раз."}
                </h3>
                <button
                    onClick={props.onClose}
                    className={`popup__close`}
                    type="button"
                    // onClick={this.props.onCloseAll}
                ></button>
            </div>
        </article>
    );
}

export default InfoTooltip;
