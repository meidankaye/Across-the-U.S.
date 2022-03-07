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

  async addCard(name, link) {
    const res = await fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: { authorization: this._token, "Content-Type": "application/json" },
      body: JSON.stringify({ name, link })
    })

    if (res.ok) {
      return { name, link };
    } else {
      console.log(`Error: ${res.status}`);
    }
  }

}