import React, { useEffect } from "react";
import changeIcon from "../images/Vector.png";
import avatar from "../images/Avatar.png";
import Api from "../utils/Api";
import Card from "./Card";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import react from "react";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  console.log(currentUser);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info-wrapper">
          <div className="profile__illustration-wrapper">
            <div className="profile__illustration-overlay"></div>
            <img
              className="profile__illustration-redact"
              alt="Изменить аватар"
              src={changeIcon}
              onClick={props.onEditAvatar}
            />
          </div>
          <img
            className="profile__illustration"
            alt="Аватар пользователя"
            src={currentUser.avatar}
          />
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={props.onEditProfile}
            ></button>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {props.cards.map((el, ind) => {
          return (
            <Card
              onImagePopup={props.onImagePopup}
              onCardDelete={props.onCardDelete}
              onCardLike={props.onCardLike}
              card={el}
              onImage={props.onImage}
              key={el._id}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
