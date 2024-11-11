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
		<div className=' bg-[#2e2e2e] w-[80%] rounded-lg text-center text-white m-4 p-2 relative min-h-[100px] max-w-xl mx-auto border-2 font-poppins border-stone-700 z-50'>
			<div
				className={`absolute right-0 top-0 p-0 rounded-l-full   min-w-[30%] font-lato px-2 text-[0.7em] 
				${status === 'upcoming' ? 'bg-cyan-500/90' : ''}
				${status === 'ongoing' ? 'bg-red-700/90' : ''}
				${status === 'completed' ? 'bg-emerald-500/90' : ''}
				${status === 'soon' ? 'bg-yellow-500' : ''}
				
				 `}
			>
				{tournament && status}
			</div>

			<div className='mb-8'>
				<div className='mx-auto mt-8 w-4/5 p-1 text-[0.75em] bg-teal-700 border-2 border-white/50 rounded-t-md'>
					{tournament && tournament.name}
				</div>
				<div className='text-white mx-auto  w-4/5 p-2  text-sm bg-teal-900 border-2 border-t-0 border-white/50 ?border-teal-700/50 lowercase rounded-b-lg  break-words z-50 relative'>
					{tournament && tournament.description}
				</div>

				<div
					className={`w-4/6 mx-auto rounded-b-xl border-2 border-t-0 border-white/50  min-w-[30%] font-bold text-[0.5em] uppercase bg-cyan-500/50 
					leading-tight
          relative duration-1000 ${!show ? '-translate-y-1/2' : ''}
				 `}
				>
					<div className='tracking-widest'>
						{timeLeft && timeLeft}
					</div>
					<div
						className={`p-[2px] ${show ? 'rotate-180' : ''}`}
						onClick={() => setshow(!show)}
					>
						<FontAwesomeIcon icon={faCircleDown} />
					</div>
				</div>
			</div>
			<div className='relative mb-8 border-2 border-white rounded-full'>
				<div className='absolute z-[-50] inset-0 h-4 bg-stone-700/50 rounded-full '></div>
				<div
					className={`z-100 h-4 bg-green-900 rounded-full w-[72%]  flex justify-center items-center `}
				>
					<div className='text-[0.4em]  leading-relaxed'>50/100</div>
				</div>
			</div>

			<div>
				<button
					className='px-4 p-2 bg-cyan-700 text-[0.7em]  rounded-full font-nunito active:bg-cyan-700/50 '
					onClick={handleJoin}
				>
					join now
				</button>
			</div>
		</div>
	);
};

export default TournamentCard;
