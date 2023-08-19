import Header from '../Header/Header';
import InfoTooltip from '../InfoToolTip/InfoTooltip';
import './Auth.css';
import auth from '../../utils/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState({
		email: '',
		password: '',
	});
	const [isRegSuccess, setIsRegSuccess] = useState(false);
	const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		auth
			.loginUser(userInfo)
			.then(({ token }) => {
				if (token) {
					localStorage.setItem('token', token);
					navigate('/');
				}
			})
			.catch((e) => {
				setIsRegSuccess(false);
				setIsInfoPopupOpen(true);
			});
	};
	return (
		<>
			{!isRegSuccess && isInfoPopupOpen && (
				<InfoTooltip
					isRegSuccess={isRegSuccess}
					isInfoPopupOpen={isInfoPopupOpen}
					setIsInfoPopupOpen={setIsInfoPopupOpen}
				/>
			)}
			<div className='auth'>
				<Header
					link='/sign-up'
					linkLabel='Регистрация'
				/>
				<form
					className='auth__form'
					onSubmit={handleSubmit}
				>
					<h1 className='auth__title'>Вход</h1>
					<input
						type='text'
						placeholder='Email'
						value={userInfo.email}
						onChange={(e) => {
							setUserInfo((prevState) => ({
								...prevState,
								email: e.target.value,
							}));
						}}
					/>
					<input
						type='password'
						placeholder='Пароль'
						value={userInfo.password}
						onChange={(e) => {
							setUserInfo((prevState) => ({
								...prevState,
								password: e.target.value,
							}));
						}}
					/>
					<button
						className='auth__button'
						type='submit'
					>
						Войти
					</button>
				</form>
			</div>
		</>
	);
};
export default Login;
