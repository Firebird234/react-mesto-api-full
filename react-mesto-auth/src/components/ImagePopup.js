import React from "react";

function ImagePopup(props) {
    function handleOverlay(e) {
        // const popups = Array.from(document.querySelectorAll(".popup"));
        // e.stopPropagation();
        // popups.forEach((el) => {
        //     e.target === el && props.onClose();
        // });
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    }

    return (
        <article
            onClick={handleOverlay}
            className={`popup popup_${props.name} ${
                props.isOpen && "popup_opened"
            }`}
        >
            <div className="popup__wrapper">
                <img
                    className="popup__illustration"
                    src={`${props.card.link}`}
                    alt="Картинка места"
                />
                <h2 className="popup__image-title">{props.card.name}</h2>
                <button
                    className="popup__close popup__close_opened-image"
                    onClick={props.onClose}
                    type="button"
                ></button>
            </div>
        </article>
    );
}

export default ImagePopup;
