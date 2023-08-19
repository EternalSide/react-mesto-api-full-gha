class Auth {
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

	checkToken(token) {
		if (token) {
			return fetch(`${this._baseUrl}/users/me`, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
			}).then(this._checkRes);
		}
	}

	registerUser(userInfo) {
		return fetch(`${this._baseUrl}/signup`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				'password': `${userInfo.password}`,
				'email': `${userInfo.email}`,
			}),
		}).then(this._checkRes);
	}

	loginUser(userInfo) {
		return fetch(`${this._baseUrl}/signin`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				'password': `${userInfo.password}`,
				'email': `${userInfo.email}`,
			}),
		}).then(this._checkRes);
	}
}

const auth = new Auth({
	baseUrl: 'https://api.eternalmesto.nomoreparties.co',
	headers: {
		'Content-Type': 'application/json',
	},
});

export default auth;
