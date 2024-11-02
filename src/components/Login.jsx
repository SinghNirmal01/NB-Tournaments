import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {login as authLogin} from '../store/authSlice';
import {Button, Input, Logo} from './Index';
import {useDispatch} from 'react-redux';
import authService from '../appwrite/auth';
import {useForm} from 'react-hook-form';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';

import '../Vibrate.css';

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {register, handleSubmit} = useForm();
	const [error, setError] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [hasError, setHasError] = useState(false);

	const login = async data => {
		setLoading(true);
		setError('');
		setHasError(false);
		try {
			let user = await authService.getCurrentUser();
			if (!user) {
				// If no user is logged in, attempt to log in
				const session = await authService.login(data);
				if (session) {
					user = await authService.getCurrentUser();
					if (user) {
						dispatch(authLogin({userData: user}));
						navigate('/');
					}
				}
			} else {
				// User is already logged in
				dispatch(authLogin({userData: user}));
				console.log('User already logged in ::', user);
				navigate('/');
			}
		} catch (error) {
			if ('vibrate' in navigator) {
				navigator.vibrate(200); // Vibrates for 200ms
			}
			setError(error.message);
			setLoading(false);
			setHasError(true);
			setTimeout(() => {
				setHasError(false);
			}, 500);
		}
	};

	return (
		<div className='flex items-center justify-center w-full min-h-[100dvh] bg-[url("./bg.jpeg")] bg-cover bg-center'>
			<div
				className={`mx-auto w-full min-h-[100dvh] max-w-lg  rounded-xl p-10 backdrop-blur-sm border border-black/10`}
			>
				<div className='mb-2 flex justify-center'>
					<span className='inline-block w-full max-w-[150px]  rounded-xl bg-amber-600 grid place-items-center'>
						<Logo width='100%' />
					</span>
				</div>

				<form
					onSubmit={handleSubmit(login)}
					className={`mt-8 bg-[rgba(0,0,0,0.5)] p-4 rounded-lg text-white ${hasError ? 'animate-vibrate' : ''}`}
				>
					<div className='text-center  text-xl my-4  leading-tight'>
						<h2 className='text-sm'>Welcome Back To</h2>{' '}
						<div className='my-1 font-medium  drop-shadow-[0_0_8px_rgba(255,255,255,1)] '>
							NB Tournaments
						</div>
					</div>
					<div className='space-y-5'>
						<Input
							label='Email: '
							placeholder='Enter your email'
							type='email'
							icon={<FontAwesomeIcon icon={faEnvelope} />}
							{...register('email', {
								required: true,
								validate: {
									matchPattern: value =>
										/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
											value
										) ||
										'Email address must be a valid address'
								}
							})}
						/>
						<Input
							label='Password: '
							type='password'
							icon={<FontAwesomeIcon icon={faLock} />}
							placeholder='Enter your password'
							{...register('password', {
								required: true
							})}
						/>

						<Button
							type='submit'
							className={`w-full ${
								loading ? 'bg-blue-400' : ''
							} `}
							loading={loading}
							disabled={loading}
						>
							Sign in
						</Button>
						{error && (
							<p className='text-red-600 text-[0.5em] bg-black p-2 rounded-xl mt-8 text-center'>
								{error}
							</p>
						)}
					</div>
				</form>
				<p className='w-full text-center my-4 text-xl'>or</p>
				<p className='mt-2 text-center text-base text-black/600 bg-[rgba(255,255,255,0.5)] rounded-lg p-2 '>
					Don&apos;t have any account?&nbsp;
					<Link
						to='/signup'
						className='font-medium gon font-bold text-primary transition-all duration-200 hover:underline'
					>
						create one
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;
