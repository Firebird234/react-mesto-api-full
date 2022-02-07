import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextType = CurrentUserContext;

  handleClick = () => {
    this.props.onImage(this.props.card);
    this.props.onImagePopup();
    console.log(this.props.card);
  };

  handleLikeClick = () => {
    this.props.onCardLike(this.props.card);
  };

  handleDeleteClick = () => {
    this.props.onCardDelete(this.props.card);
  };

  render() {
    return (
      <article className="elements__item">
        {/* {console.log(el)} console.log(this.context)*/}
        <img
          className="elements__illustration"
          src={this.props.card.link}
          alt="Иллюстрация к карточке"
          onClick={this.handleClick}
        />
        <div className="elements__info">
          <h2 className="elements__title">{this.props.card.name}</h2>
          <div className="elements__info-container">
            <button
              className={`elements__like ${
                this.props.card.likes.some((el) => {
                  console.log(el);
                  return el === this.context._id;
                }) && "elements__like_active"
              }`}
              onClick={this.handleLikeClick}
              type="button"
            ></button>
            <span className="elements__like-count">
              {this.props.card.likes.length}
            </span>
          </div>
        </div>
        <button
          onClick={this.handleDeleteClick}
          className={`elements__delete ${
            this.props.card.owner !== this.context._id &&
            "elements__delete_hidden"
          }`}
        ></button>
      </article>
    );
  }
}

export default Card;
