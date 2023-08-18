class Api {
	constructor(options) {
		this._baseUrl = options.baseUrl;
		this.headers = options.headers;
	}

	_checkRes(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Error: ${res.status}`);
	}

	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			headers: this.headers,
		}).then(this._checkRes);
	}

	changeUserInfo(data) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify({
				name: data.name,
				about: data.about,
			}),
		}).then(this._checkRes);
	}
	changeAvatar(data) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify({
				avatar: data,
			}),
		}).then(this._checkRes);
	}

	addCard(data) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				name: data.name,
				link: data.link,
			}),
		}).then(this._checkRes);
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: this.headers,
		}).then(this._checkRes);
	}

	deleteCard(id) {
		return fetch(`${this._baseUrl}/cards/${id}`, {
			method: 'DELETE',
			headers: this.headers,
		}).then(this._checkRes);
	}

	addLike(id) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: 'PUT',
			headers: this.headers,
		}).then(this._checkRes);
	}

	deleteLike(id) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: 'DELETE',
			headers: this.headers,
		}).then(this._checkRes);
	}
}
const api = new Api({
	baseUrl: 'http://84.201.134.189/api',
	headers: {
		'Content-Type': 'application/json',
	},
});

export default api;
