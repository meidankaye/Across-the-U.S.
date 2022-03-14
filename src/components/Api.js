export default class Api {

  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _customFetch = (url, headers) => {
    return fetch(url, headers)
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  getInitialCards() {
    return this._customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  updateUserImage(data) {
    return this._customFetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ avatar: data }),
    });
  }

  updateProfile({ name, about }) {
    return this._customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name,
        about
      })
    });
  }

  addCard({ name, link }) {
    return this._customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
         name,
         link 
      })
    });
  }

  removeCard(cardID) {
    return this._customFetch(`${this._baseUrl}/cards/${cardID}`, {
      headers: this._headers,
      method: 'DELETE',
    });
  }

  likeCard(cardID) {
    return this._customFetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      headers: this._headers,
      method: 'PUT',
    });
  }

  dislikeCard(cardID) {
    return this._customFetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      headers: this._headers,
      method: 'DELETE',
    });
  }

}