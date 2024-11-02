import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import authService from '../../appwrite/auth';
import {logout} from '../../store/authSlice';

function LogoutBtn() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logoutHandler = async () => {
		try {
			const session = await authService.getCurrentUser(); // Get current session
			if (session) {
				await authService.logout();
				dispatch(logout());
				navigate('/login');
			} else {
				console.log('No active session found');
			}
		} catch (error) {
			console.error('Logout error:', error.message);
		}
	};
	return (
		<button
			className='inline-bock px-6 py-2 duration-200 bg-blue-300 hover:bg-blue-500 rounded-full'
			onClick={logoutHandler}
		>
			Logout
		</button>
	);
}

export default LogoutBtn;
