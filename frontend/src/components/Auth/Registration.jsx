import './Auth.css';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import InfoTooltip from '../InfoToolTip/InfoTooltip';
import auth from '../../utils/auth';
import Header from '../Header/Header';
const Registration = () => {
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState({
		email: '',
		password: '',
	});
	const [isRegSuccess, setIsRegSuccess] = useState(false);
	const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		auth
			.registerUser(userInfo)
			.then(() => {
				setIsRegSuccess(true);
				setTimeout(() => {
					navigate('/sign-in');
				}, 2000);
			})
			.catch((e) => {
				setIsRegSuccess(false);
			})
			.finally(() => setIsInfoPopupOpen(true));
	};
	return (
		<>
			{(isRegSuccess || !isRegSuccess) && isInfoPopupOpen && (
				<InfoTooltip
					isRegSuccess={isRegSuccess}
					isInfoPopupOpen={isInfoPopupOpen}
					setIsInfoPopupOpen={setIsInfoPopupOpen}
				/>
			)}

			<div className='auth'>
				<Header
					link='/sign-in'
					linkLabel='Логин'
				/>
				<form
					className='auth__form'
					onSubmit={handleSubmit}
				>
					<h1 className='auth__title'>Регистрация</h1>
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
						Зарегистрироваться
					</button>
					<p>
						Уже зарегистрированы?{' '}
						<span
							className='auth__question-login-button'
							onClick={() => navigate('/sign-in')}
						>
							Войти
						</span>
					</p>
				</form>
			</div>
		</>
	);
};
export default Registration;
