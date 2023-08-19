import { useEffect, useMemo, useState } from 'react';
import ImagePopup from './ImagePopup';
import Header from './Header/Header';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup.jsx';
import Main from './Main';
import Api from '../utils/api.js';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup .jsx';
import { Navigate, useNavigate } from 'react-router-dom';
import Registration from './Auth/Registration';
import Login from './Auth/Login';
import { Routes, Route } from 'react-router-dom';
import auth from '../utils/auth';
function App() {
	const [cards, setCards] = useState([]);
	const [currentUser, setCurrentUser] = useState({
		tokenInfo: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);

	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	const api = useMemo(() => {
		return new Api({
			baseUrl: 'https://api.eternalmesto.nomoreparties.co',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
		});
	}, [token]);

	// Начальное инфо и проверить токен
	useEffect(() => {
		if (token) {
			Promise.all([api.getInitialCards(), api.getUserInfo(), auth.checkToken(token)])
				.then(([cards, userInfo, { data: tokenInfo }]) => {
					setLoggedIn(true);
					setCards(cards.reverse());
					setCurrentUser({
						...userInfo,
						tokenInfo: tokenInfo,
					});
				})
				.catch((e) => {
					console.log(e);
					navigate('/sign-in');
				});
		}
	}, [token, navigate, api]);

	//  Лайк
	const handleCardLike = (card) => {
		const isLiked = card.likes.some((item) => item === currentUser._id);

		if (!isLiked) {
			api
				.addLike(card._id)
				.then((newCard) => {
					const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
					setCards(newCards);
				})
				.catch((e) => console.log(e));
		} else {
			api
				.deleteLike(card._id)
				.then((newCard) => {
					const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
					setCards(newCards);
				})
				.catch((e) => console.log(e));
		}
	};
	// Удалить карточку
	const handleCardDelete = (card) => {
		api
			.deleteCard(card._id)
			.then(() => {
				const updatedCards = [...cards.filter((item) => item._id !== card._id)];
				setCards(updatedCards);
			})
			.catch((e) => console.log(e));
	};
	//Попапы
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState(null);

	// Close all
	const closeAllPopups = () => {
		setIsEditAvatarPopupOpen(false);
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setSelectedCard(null);
	};

	function handleSubmit(request) {
		setIsLoading(true);
		request()
			.then(closeAllPopups)
			.catch(console.error)
			.finally(() => setIsLoading(false));
	}
	// Обновить аватар
	const handleUpdateAvatar = (data) => {
		function makeRequest() {
			return api.changeAvatar(data.avatar).then(
				setCurrentUser((prev) => ({
					...prev,
					avatar: data.avatar,
				}))
			);
		}
		handleSubmit(makeRequest);
	};
	// Обновить информацию о пользователе
	const handleUpdateUser = (data) => {
		function makeRequest() {
			return api.changeUserInfo(data).then(
				setCurrentUser((prev) => ({
					...prev,
					name: data.name,
					about: data.about,
				}))
			);
		}
		handleSubmit(makeRequest);
	};

	// Добавление карточки
	const handleAddPlaceSubmit = (data) => {
		function makeRequest() {
			return api.addCard(data).then((newCard) => {
				setCards([newCard, ...cards]);
				setIsAddPlacePopupOpen(false);
			});
		}
		handleSubmit(makeRequest);
	};

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className='page'>
				<Routes>
					<Route
						path='/sign-in'
						element={<Login />}
					/>
					<Route
						path='/sign-up'
						element={<Registration />}
					/>
					<Route
						path='/'
						element={
							token ? (
								<>
									<Header
										userEmail={currentUser?.email}
										loggedIn={loggedIn}
									/>
									<Main
										cards={cards}
										onEditProfile={() => setIsEditProfilePopupOpen(true)}
										onEditPlace={() => setIsAddPlacePopupOpen(true)}
										onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
										onCardClick={(data) => setSelectedCard(data)}
										onCardLike={handleCardLike}
										onCardDelete={handleCardDelete}
									/>
									<Footer />
								</>
							) : (
								<Navigate to='/sign-in' />
							)
						}
					/>
				</Routes>
				{/* Попапы */}
				{selectedCard !== null && (
					<ImagePopup
						card={selectedCard}
						onClose={closeAllPopups}
					/>
				)}
				<EditProfilePopup
					isLoading={isLoading}
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
				/>
				<AddPlacePopup
					isLoading={isLoading}
					onClose={closeAllPopups}
					isAddPlacePopupOpen={isAddPlacePopupOpen}
					onAddPlace={handleAddPlaceSubmit}
				/>
				<EditAvatarPopup
					isLoading={isLoading}
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
				/>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
