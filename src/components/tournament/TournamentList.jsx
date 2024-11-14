import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {TournamentCard} from '../Index';
const TournamentList = () => {
	const [currentSection, setCurrentSection] = useState('tournaments');
	const [swapping, setSwapping] = useState(false);

	const tournaments = useSelector(state => state.tournament.tournaments);
	const upcomingTournaments = useSelector(
		state => state.tournament.upcomingTournaments
	);
	const ongoingTournaments = useSelector(
		state => state.tournament.ongoingTournaments
	);
	const completedTournaments = useSelector(
		state => state.tournament.completedTournaments
	);

	const [displayTournaments, setDisplayTournaments] = useState(tournaments);
	return (
		<div className='w-full  text-center pb-4 overflow-hidden'>
			<div className='flex  flex-col justify-center items-center border-2 dark:border-[#ffffff] border-[#333333] '>
				<div className='w-full p-4 font-rajdhani font-bold bg-[#ff7272]   text-[#fff]  '>
					<div
						className='bg-[#3e95ff] p-2 rounded-full duration-300 text-[0.8em] active:scale-90'
						onClick={() => {
							setSwapping(true);
							setTimeout(() => {
								setSwapping(false);
								setDisplayTournaments(tournaments);
							}, 300);
						}}
					>
						All Tournaments : {tournaments.length}
					</div>
				</div>
				<div className='w-full bg-[#ff7272] border-t-2    flex justify-around p-2 text-[0.5em] font-montserrat text-[#333333] dark:border-[#333333]  '>
					<div
						className='bg-sky-400 font-bold dark:bg-sky-700 dark:text-white border-2 border-black dark:border-white px-3 py-1 rounded-full  leading-tight  transition duration-400 active:-translate-y-1/4'
						onClick={() => {
							setSwapping(true);
							setTimeout(() => {
								setSwapping(false);
								setDisplayTournaments(upcomingTournaments);
							}, 300);
						}}
					>
						<div>Upcoming</div>
						<div>{upcomingTournaments.length}</div>
					</div>
					<div
						className='bg-sky-400 font-bold dark:bg-sky-700 dark:text-white border-2 border-black dark:border-white px-3 py-1 rounded-full  leading-tight  transition duration-400 active:-translate-y-1/4'
						onClick={() => {
							setSwapping(true);
							setTimeout(() => {
								setSwapping(false);
								setDisplayTournaments(ongoingTournaments);
							}, 300);
						}}
					>
						<div>Ongoing</div>
						<div>{ongoingTournaments.length}</div>
					</div>
					<div
						className='bg-sky-400 font-bold dark:bg-sky-700 dark:text-white border-2 border-black dark:border-white px-3 py-1 rounded-full  leading-tight  transition duration-400 active:-translate-y-1/4'
						onClick={() => {
							setSwapping(true);
							setTimeout(() => {
								setSwapping(false);
								setDisplayTournaments(completedTournaments);
							}, 300);
						}}
					>
						{' '}
						<div>Completed</div>
						<div>{completedTournaments.length}</div>
					</div>
				</div>
			</div>
			<div
				className={` py-2 duration-300 ${
					swapping ? 'translate-x-[100%] opacity-0' : ''
				}`}
			>
				{displayTournaments ? (
					displayTournaments.map((tournament, index) => (
						<TournamentCard
							key={tournament.name}
							tournament={tournament}
						/>
					))
				) : (
					<p>Error: No tournaments available</p>
				)}
			</div>
		</div>
	);
};

export default TournamentList;
