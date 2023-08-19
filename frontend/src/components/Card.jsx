import CurrentUserContext from '../contexts/CurrentUserContext';
import { useContext } from 'react';
const Card = ({ data: card, onCardClick, onCardLike, onCardDelete }) => {
	const user = useContext(CurrentUserContext);
	const isUserOwner = card.owner === user._id;

	const isUserLiked = card.likes.some((item) => item === user._id);

	const handleLikeClick = () => {
		return onCardLike(card);
	};
	const handleDeleteClick = () => {
		return onCardDelete(card);
	};

	return (
		<div className='elements__block'>
			{isUserOwner && (
				<button
					onClick={handleDeleteClick}
					type='button'
					className='elements__delete-icon'
				></button>
			)}
			<img
				onClick={() => onCardClick(card)}
				className='elements__pic'
				src={card.link}
				alt={card.name}
			/>
			<div className='elements__info'>
				<h2 className='elements__pic-name'>{card.name}</h2>
				<div className='elements__like-block'>
					<button
						onClick={handleLikeClick}
						type='button'
						className={isUserLiked ? 'elements__like elements__like_active' : 'elements__like'}
					></button>
					<p className='elements__like-counter'>{card.likes.length}</p>
				</div>
			</div>
		</div>
	);
};

export default Card;
