import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Header from "./Header";
import Api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup ";
import Register from "./Register";
import LogIn from "./Login";
import InfoTooltip from "./InfoToolTip/InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import NavButton from "./Nav/NavButton";
import sendAuth from "../utils/Auth";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import react from "react";

function App() {
  const history = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  //ПОПАПЫ---------------------------------------------------------
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImageAvatarPopupOpen, setIsImageAvatarPopupOpen] =
    React.useState(false);

  const [isAuthPopupOpen, setIsAuthPopupOpen] = React.useState(false);
  const [isRegSucces, setIsRegSucces] = React.useState("");
  //ПОПАПЫ_________________________________________________________

  //ЮЗЕР И КАРТОЧКИ_---------------------------------------------------
  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  const [mail, setMail] = React.useState("");
  //ЮЗЕР И КАРТОЧКИ___________________________________________________

  //ИКОНКА ЗАГРУЗКИ---------------------------------------------------
  const [loaderEdit, setLoaderEdit] = React.useState(false);
  const [loaderAdd, setLoaderAdd] = React.useState(false);
  const [loaderAva, setLoaderAva] = React.useState(false);
  //ИКОНКА ЗАГРУЗКИ___________________________________________________
  React.useEffect(() => {
    console.log(localStorage.getItem("token"));
    handleTokenCheck();
  }, [loggedIn]);

  // React.useEffect(() => {
  //   Api.getUserData()
  //     .then((data) => {
  //       setCurrentUser(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleImageAvatarPopupClick() {
    setIsImageAvatarPopupOpen(true);
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImageAvatarPopupOpen(false);
    setIsAuthPopupOpen(false);
    setSelectedCard({});
  }

  React.useEffect(() => {
    function handleEsc(event) {
      if (event.key === `Escape`) {
        closeAllPopups();
      }
    }
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  function handleUpdateUser(data) {
    setLoaderEdit(true);
    Api.sendUserData(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoaderEdit(false);
      });
  }

  function handleUpdatAvatar(data) {
    setLoaderAva(true);
    Api.changeAvatarRequest(data.avatar)
      .then((data) => {
        setCurrentUser({ ...currentUser, avatar: data.avatar });
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoaderAva(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setLoaderAdd(true);
    Api.sendUserCard(data)
      .then((data) => {
        setCards([data, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoaderAdd(false);
      });
  }

  //CARDS

  React.useEffect(() => {
    Api.getCards()
      .then((items) => {
        setCards(items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    //Снова проверяем, есть ли уже лайк на этой карточке
    console.log(currentUser._id);
    const isLiked = card.likes.some((i) => {
      console.log(i);
      return i === currentUser._id;
    });
    console.log(card);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    Api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteClick(card) {
    Api.deleteCardRequest(card._id)
      .then((newCard) => {
        setCards((cards) => cards.filter((c) => c !== card));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegistrationSubmit(data) {
    sendAuth
      .registration(data)
      .then((regData) => {
        history("/sign-in");
        setIsAuthPopupOpen(true);
        setIsRegSucces(true);
        console.log(regData);
        // if (regData.data._id) {
        //     setIsRegSucces(true);
        // }
      })
      .catch((err) => {
        setIsAuthPopupOpen(true);
        setIsRegSucces(false);

        console.log(err);
      });
  }
  function handleLogInSubmit(data) {
    sendAuth
      .authorization(data)
      .then((logInData) => {
        localStorage.setItem("token", logInData.token);
        setLoggedIn(true);
        setCurrentUser(data);

        history("/");

        return logInData;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleTokenCheck() {
    const myToken = localStorage.getItem("token");
    console.log(myToken);
    if (myToken) {
      sendAuth
        .checkToken(myToken)
        .then((logInData) => {
          setCurrentUser(logInData);
          setMail(logInData.email);
          console.log(logInData);
          if (logInData) {
            setLoggedIn(true);
            console.log("done");
            history("/");
          }
        })
        .catch((err) => {
          console.log("my", err);
        });
    }
  }

  function handleExitAccount() {
    setMail("");
    localStorage.removeItem("token");
    setCurrentUser({});
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <InfoTooltip
          success={isRegSucces}
          onClose={closeAllPopups}
          isOpened={isAuthPopupOpen}
        />

        <Routes>
          <Route
            path="/sign-in"
            element={
              <>
                <Header
                  children={
                    <>
                      <NavButton
                        email={false}
                        buttonText="Регистрация"
                        redirect="/sign-up"
                      />
                    </>
                  }
                />
                <LogIn onSubmit={handleLogInSubmit} />
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Header
                  children={
                    <>
                      <NavButton
                        email={false}
                        buttonText="Войти"
                        redirect="/sign-in"
                      />
                    </>
                  }
                />
                <Register onSubmit={handleRegistrationSubmit} />
              </>
            }
          />

          <Route
            exact
            path="/"
            element={
              <ProtectedRoute redirectTo="/sign-in" loggedIn={loggedIn}>
                <Header
                  children={
                    <>
                      <NavButton
                        loggedIn={loggedIn}
                        onClick={handleExitAccount}
                        email={<h3 className="nav__email">{mail}</h3>}
                        buttonText="Выход"
                        redirect="/sign-in"
                      />
                    </>
                  }
                />
                <Main
                  currentUser={currentUser}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onImagePopup={handleImageAvatarPopupClick}
                  onImage={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteClick}
                />
                <EditProfilePopup
                  loader={loaderEdit}
                  onUpdateUser={handleUpdateUser}
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                />
                <EditAvatarPopup
                  loader={loaderAva}
                  onUpdateUser={handleUpdatAvatar}
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                />
                <AddPlacePopup
                  loader={loaderAdd}
                  onAddCard={handleAddPlaceSubmit}
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                />
                <PopupWithForm title="Вы уверены?" name="reset-avatar" />
                <ImagePopup
                  isOpen={isImageAvatarPopupOpen}
                  name="press-image"
                  card={selectedCard}
                  onClose={closeAllPopups}
                />
                <Footer />{" "}
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
