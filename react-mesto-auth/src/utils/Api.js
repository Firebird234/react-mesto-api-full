export class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  sendUserData(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  sendUserCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.addName,
        link: data.addLink,
      }),
    }).then(this._checkResponse);
  }

  //ЭТО ТЕСТЕР
  //     sendUserCard() {
  //     return fetch(`${this._baseUrl}cards`, {
  //         method: 'POST',
  //         headers: this._headers,
  //         body: JSON.stringify({
  //           name: 'EMPERROR GUIDES',
  //           link: 'https://yobte.ru/uploads/posts/2019-11/warhammer-40000-55-foto-39.jpg'
  //         })
  //       })
  //       .then(this._checkResponse);
  // }

  deleteCardRequest(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  pressLikeRequest(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deleteLikeRequest(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeAvatarRequest(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data,
      }),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    console.log(isLiked);
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      })
        .then((res) => {
          return res;
        })
        .then(this._checkResponse);
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      })
        .then((res) => {
          console.log(res);
          return res;
        })
        .then(this._checkResponse);
    }
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  // registration(link, data) {
  //     return fetch(`${link}/signup`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //             password: data.registerPassword,
  //             email: data.registerEmail,
  //         }),
  //     })
  //         .then((res) => {
  //             return res;
  //         })
  //         .then(this._checkResponse);
  // }

  // authorization(link, data) {
  //     return fetch(`${link}/signin`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //             password: data.logInPassword,
  //             email: data.logInEmail,
  //         }),
  //     })
  //         .then((res) => {
  //             console.log(res);
  //             return res;
  //         })
  //         .then((res) => {
  //             if (res.token) {
  //                 localStorage.setItem("token", res.token);
  //                 return res;
  //             } else {
  //                 return res;
  //             }
  //         })
  //         .then(this._checkResponse);
  // }

  // checkToken(link, token) {
  //     return fetch(`${link}/users/me`, {
  //         method: "GET",
  //         headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //         },
  //     })
  //         .then((res) => {
  //             return res;
  //         })
  //         .then(this._checkResponse);
  // }
  //https://api.best-site.ever.nomoredomains.work
}

const sendRequest = new Api("https://api.wazzuuuuup.nomoredomains.work", {
  authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
  credentials: "include",
});

export default sendRequest;

// const sendRequest = new Api("http://api.best-site.ever.nomoredomains.work", {
//   authorization: `Bearer${localStorage.getItem("token")}`,
//   "Content-Type": "application/json",
//   credentials: "include",
// });

// export default sendRequest;
