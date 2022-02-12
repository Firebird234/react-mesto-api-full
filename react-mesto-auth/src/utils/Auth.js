export class Auth {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  registration(data) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: data.registerPassword,
        email: data.registerEmail,
      }),
    })
      .then((res) => {
        return res;
      })
      .then(this._checkResponse);
  }

  authorization(data) {
    return (
      fetch(`${this._baseUrl}/signin`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          password: data.logInPassword,
          email: data.logInEmail,
        }),
      })
        .then((res) => {
          console.log(res);
          return res;
        })
        .then((res) => {
          if (res.token) {
            localStorage.setItem("token", res.token);
            return res;
          } else {
            return res;
          }
        })
        // .then((res) => {
        //   if (res.cookie.token) {
        //     localStorage.setItem("token", res.cookie.token);
        //     return res;
        //   } else {
        //     return res;
        //   }
        // })
        .then(this._checkResponse)
    );
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res;
      })
      .then(this._checkResponse);
  }
}
// https://api.best-site.ever.nomoredomains.work
// const sendAuth = new Auth("http://api.best-site.ever.nomoredomains.work", {
//   // authorization: `Bearer${localStorage.getItem("token")}`,
//   "Content-Type": "application/json",
// });

// export default sendAuth;

const sendAuth = new Auth("https://api.wazzuuuuup.nomoredomains.work", {
  // authorization: `Bearer${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

export default sendAuth;
