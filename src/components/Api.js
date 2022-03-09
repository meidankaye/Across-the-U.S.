export default class Api {

  constructor(options) {
    this._url = options.baseUrl;
    this._token = options.token;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: { authorization: this._token }
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    .catch((err) => {
      console.log(err);
    });
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: { authorization: this._token }
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    .catch((err) => {
      console.log(err);
    });
  }

  addCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
         authorization: this._token,
         "Content-Type": "application/json" 
      },
      body: JSON.stringify({
         name,
         link 
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    .catch((err) => {
      console.log(err);
    });
  }

  removeCard(cardID) {
    return fetch(`${this._url}/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
         authorization: this._token,
         "Content-Type": "application/json" 
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
    .catch((err) => {
      console.log(err);
    });
  }

}