import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
	faBars,
	faWallet,
	faHouse,
	faUser,
	faTrophy
} from '@fortawesome/free-solid-svg-icons';

import {Tournament, Profile} from './index.js';
// import '../Debug.css';
import {LogoutBtn, ToggleTheme} from '../components/Index.js';
const Home = () => {
	const userProfile = useSelector(state => state.auth.profileData);
	const [currentScreen, setCurrentScreen] = useState('home');
	return (
		<>
			<div className='bg-[#f9f9f9]  w-full min-h-[100dvh] mx-auto text-center text-2xl text-[#2E7D32] bg-[#dbeddc] dark:bg-slate-800 select-none font-bebas tracking-wide '>
				<div className='p-2 px-4 w-full  top-0 bg-[#f9f9f9] dark:bg-[#121212] text-[#333333] dark:text-[#FFFFFF]  border-b-2 border-[#81C784]   rounded-b-lg flex justify-between items-center z-[50] text-white'>
					<div className='w-[20%]  flex'>
						<FontAwesomeIcon icon={faBars} />
					</div>
					<div className='w-[50%]  leading-[0.75em] '>
						<div>welcome</div>
						<div className='translate-x-[2em] text-[0.7em]'>
							{userProfile ? userProfile.username : 'back'}
						</div>
					</div>
					<div className='flex w-1/2  justify-between items-center  '>
						<div>
							<ToggleTheme />
						</div>
						<div className='text-[0.7em] bg-[#AAF8D1] dark:bg-[#2c3e50] text-[#E0R0E0] dark:text-[#00FF87] p-1 border-2 border-cyan-500 flex justify-center items-center gap-2 rounded-full font-poppins '>
							<FontAwesomeIcon icon={faWallet} /> : 1 0
						</div>
					</div>
				</div>
				<div className=''>
					<div
						className={`${
							currentScreen == 'home' ? ' block' : 'hidden'
						}`}
					>
						<Tournament />
					</div>
					<div
						className={` ${
							currentScreen == 'user' ? ' block' : 'hidden'
						}`}
					>
						<Profile />
					</div>
				</div>
				<div className='p-0 pt-4 border-t-2 border-[#81C784] w-full sticky bottom-0 bg-[#f9f9f9] dark:bg-[#121212] text-[#333333] dark:text-[#FFFFFF] rounded-t-lg flex justify-around items-center   font-poppins z-[10000] '>
					<div
						className={`flex flex-col justify-center items-center w-[20%] duration-500 ${
							currentScreen == 'tournaments'
								? ' -translate-y-[10%]'
								: ''
						}`}
						onClick={() => {
							setCurrentScreen('tournaments');
							window.scrollTo({
								top: 0
							});
						}}
					>
						<FontAwesomeIcon
							className={`duration-500 ${
								currentScreen == 'tournaments'
									? ' scale-[1.2]'
									: ''
							}`}
							icon={faTrophy}
						/>

						<p className='text-[0.5em]'>Tournament</p>
					</div>
					<div
						className={`flex flex-col justify-center items-center w-[20%] duration-500 ${
							currentScreen == 'home' ? ' -translate-y-[10%]' : ''
						}`}
						onClick={() => {
							setCurrentScreen('home');
							window.scrollTo({
								top: 0
							});
						}}
					>
						<FontAwesomeIcon
							className={`duration-500 ${
								currentScreen == 'home' ? ' scale-[1.2]' : ''
							}`}
							icon={faHouse}
						/>
						<p className='text-[0.5em] '>Home</p>
					</div>
					<div
						className={`flex flex-col justify-center items-center w-[20%] duration-500 ${
							currentScreen == 'user' ? ' -translate-y-[10%]' : ''
						}`}
						onClick={() => {
							setCurrentScreen('user');
							window.scrollTo({
								top: 0
							});
						}}
					>
						<FontAwesomeIcon
							className={`duration-500 ${
								currentScreen == 'user' ? ' scale-[1.2]' : ''
							}`}
							icon={faUser}
						/>
						<p className='text-[0.5em] '>Account</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
