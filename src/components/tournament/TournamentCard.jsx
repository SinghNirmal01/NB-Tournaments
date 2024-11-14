import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import tournamentService from '../../appwrite/tournamentService.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleDown} from '@fortawesome/free-solid-svg-icons';
const TournamentCard = ({tournament}) => {
	const player = useSelector(state => state.auth.profileData) || null;

	const [status, setStatus] = useState(tournament.status);
	const [timeLeft, setTimeLeft] = useState('');
	const [show, setshow] = useState(false);
	// Function to calculate the time left
	const calculateTimeLeft = () => {
		const eventDate = new Date(tournament.date);
		const now = new Date();
		const diff = eventDate - now;

		if (diff <= -10000000000) {
			setStatus('ongoing');
			return 'STARTED';
		} else if (diff <= -300000000) {
			setStatus('soon');
			return 'starting soon';
		} else {
			// Calculate days, hours, minutes, and seconds for times greater than 30 minutes
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));
			const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
			const minutes = Math.floor((diff / (1000 * 60)) % 60);
			const seconds = Math.floor((diff / 1000) % 60);
			return `${days}d ${hours}h ${minutes}m ${seconds}s `;
		}
	};

	const handleJoin = async () => {
		try {
			await tournamentService.joinTournament({
				tournamentId: tournament.$id,
				playerId: player.playerId
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		// Update the countdown every second
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		// Clear the interval on component unmount
		return () => clearInterval(timer);
	}, [tournament.date]);

	return (
		<div className='bg-white dark:bg-[#2e2e2e] w-[80%] rounded-lg rounded-tl-none text-center text-white m-4 p-2 relative min-h-[100px] max-w-xl mx-auto border-2 font-poppins border-stone-700 z-50'>
			{/*
			<div
				className={`absolute right-0 top-0 p-0 rounded-l-full   min-w-[30%] font-lato px-2 text-[0.7em] 
				${status === 'upcoming' ? 'bg-cyan-500/90' : ''}
				${status === 'ongoing' ? 'bg-red-700/90' : ''}
				${status === 'completed' ? 'bg-emerald-500/90' : ''}
				${status === 'soon' ? 'bg-yellow-500' : ''}
				
				 `}
			>
				{tournament && status}
			</div>*/}
			<div
				className={`absolute left-0 top-0 px-4  rounded-br-full   min-w-[30%] font-lato px-2 text-[0.7em]  bg-rose-600 

				 `}
			>
				FreeFire
			</div>
			<div className='mb-8 bg-rose-200 rounded-xl '>
				<div className='mx-auto mt-8 p-1 text-xl text-black dark:text-white font-extrabold tracking-wider'>
					{tournament && tournament.name}
				</div>
				<div className='text-black dark:text-white mx-auto  w-4/5 p-2  text-[0.7em]  lowercase  break-words z-50 relative'>
					{tournament && tournament.description}
				</div>
				<div className='sticky bottom-0 text-black text-sm text-center w-5/6 mx-auto bg-rose-700 p-1 rounded-t-full text-white'>
					{timeLeft && timeLeft}
				</div>
			</div>

			<div>
				<button
					className='px-4 p-2  bg-sky-700 dark:bg-sky-200 text-[0.7em] dark:text-black uppercase  font-extrabold  rounded-full   active:bg-sky-700/50 dark:active:bg-sky-200/50'
					onClick={handleJoin}
				>
					join now
				</button>
			</div>
		</div>
	);
};

export default TournamentCard;
