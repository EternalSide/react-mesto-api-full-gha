import Card from './Card';
import { useContext } from 'react';
import changeAvatar from '../images/ChangeAvatar.png';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

const Main = ({ cards, onEditAvatar, onEditProfile, onEditPlace, onCardClick, onCardLike, onCardDelete }) => {
	const userInfo = useContext(CurrentUserContext);

	return (
		<main>
			<section className='profile'>
				<div className='profile__image-container'>
					<img
						src={userInfo.avatar}
						alt='Аватар в профиле'
						className='profile__image'
					/>
					<div
						className='profile__icon-container'
						onClick={onEditAvatar}
					>
						<img
							className='profile__change-icon'
							src={changeAvatar}
							alt='Иконка смены Аватара'
						/>
					</div>
				</div>
				<div className='profile__info'>
					<div className='profile__info-edit'>
						<h1 className='profile__name'>{userInfo.name}</h1>
						<button
							type='button'
							className='profile__edit'
							onClick={onEditProfile}
						></button>
					</div>
					<p className='profile__bio'>{userInfo.about}</p>
				</div>
				<button
					type='button'
					className='profile__add'
					onClick={onEditPlace}
				></button>
			</section>

			<section className='elements'>
				{cards.map((item) => {
					return (
						<Card
							onCardClick={onCardClick}
							key={item._id}
							data={item}
							onCardLike={onCardLike}
							onCardDelete={onCardDelete}
						/>
					);
				})}
			</section>
		</main>
	);
};

export default Main;
