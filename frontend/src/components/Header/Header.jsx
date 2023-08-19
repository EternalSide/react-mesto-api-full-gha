import logo from '../../images/logo.svg';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Header = ({ userEmail, loggedIn, link, linkLabel }) => {
	const navigate = useNavigate();

	const signOut = () => {
		localStorage.removeItem('token');
		navigate('/sign-in');
	};
	return (
		<header className='header'>
			<img
				src={logo}
				alt='Лого сайта'
				className='header__logo'
			/>
			{loggedIn ? (
				<div className='header__info'>
					<p className='header__email'>{userEmail}</p>
					<button
						className='header__logout-button'
						onClick={signOut}
					>
						Выйти
					</button>
				</div>
			) : (
				<Link
					to={link}
					className='header__link'
				>
					{linkLabel}
				</Link>
			)}
		</header>
	);
};

export default Header;
