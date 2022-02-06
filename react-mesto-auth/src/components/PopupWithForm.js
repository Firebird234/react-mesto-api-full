import React from "react";

class PopupWithForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleOverlay = (e) => {
        if (e.target === e.currentTarget) {
            this.props.onCloseAll();
        }
        // const popups = Array.from(document.querySelectorAll(".popup"));
        // e.stopPropagation();
        // popups.forEach((el) => {
        //     e.target === el && this.props.onCloseAll();
        // });
    };

    render() {
        return (
            <article
                onMouseUp={this.handleOverlay}
                className={`popup popup_${this.props.name} ${
                    this.props.isOpen && "popup_opened"
                }`}
            >
                <div className="popup__container">
                    <h2 className="popup__title">{this.props.title}</h2>
                    <form
                        onSubmit={this.props.onSubmit}
                        className={`form form_${this.props.name}`}
                        name={`${this.props.name}`}
                        id={`form_${this.props.name}ID`}
                    >
                        {this.props.children}
                        <button
                            type="submit"
                            className={`popup__submit 
                            ${!this.props.validButton && "ssubmit-invalid"}`}
                        >
                            Сохранить
                        </button>
                    </form>
                    <button
                        className={`popup__close popup_${this.props.name}`}
                        type="button"
                        onClick={this.props.onCloseAll}
                    ></button>

                    {this.props.loader && (
                        <div className="circ">
                            <div className="circ_load">Loading . . . </div>
                            <div className="circ_hands"></div>
                            <div className="circ_body"></div>
                            <div className="circ_head">
                                <div className="circ_eye"></div>
                            </div>
                        </div>
                    )}
                </div>
            </article>
        );
    }
}

export default PopupWithForm;
