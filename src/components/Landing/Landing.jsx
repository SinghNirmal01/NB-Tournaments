import React, {useState, useEffect} from 'react';
import {Container, Logo, LogoutBtn} from '../Index';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

function Header() {
	const authStatus = useSelector(state => state.auth.status);
	const navigate = useNavigate();

	const navItems = [
		{
			name: 'Home',
			slug: '/',
			active: true
		},
		{
			name: 'Login',
			slug: '/login',
			active: !authStatus
		},
		{
			name: 'Signup',
			slug: '/signup',
			active: !authStatus
		},
		{
			name: 'tournaments',
			slug: '/tournaments',
			active: authStatus
		},
		{
			name: 'account',
			slug: '/account',
			active: authStatus
		}
	];

	return (
		<div className='min-h-[100dvh] w-full mx-auto py-10'>
			<div className='w-[150px] h-[150px] flex justify-center items-center mx-auto bg-white rounded-xl'>
				logo
			</div>

			<h2 className='w-full text-2xl text-center text-white font-bold my-4'>
				Login
			</h2>
			<div className='w-full text-2xl text-center text-white font-bold my-4'>
				<span>Don't have account</span><hr/>
				<Link to='/login'>create one here</Link>
			</div>
		</div>
	);
}

export default Header;
