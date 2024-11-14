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
		<div className='w-full text-center pb-4 overflow-hidden'>
			<div className='flex flex-col justify-center items-center'>
				<div className='w-full p-4 font-rajdhani font-bold bg-[#eof2f1] dark:bg-stone-900 border-2 dark:border-stone-700 border-[#81C784]  border-b-0 rounded-t-lg text-[#333333] dark:text-white '>
					<div
						className='bg-[#66bb6a] p-2 rounded-full duration-300 text-[0.8em] active:scale-90'
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
				<div className='w-full bg-[#cfd8dc] dark:bg-stone-800 border-2 dark:border-stone-700 border-t-0 rounded-b-lg flex justify-around p-2 text-[0.5em] font-montserrat text-[#333333] dark:text-white '>
					<div
						className='bg-[#adffda] dark:bg-teal-700/70  px-3 py-1 rounded-full  leading-tight  transition duration-400 active:-translate-y-1/4'
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
						className='bg-[#FF7043] dark:bg-teal-700/30  px-3 py-1 rounded-full  leading-tight  transition duration-400 active:-translate-y-1/4 '
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
						className='bg-[#f2aa2f] dark:bg-teal-700/30  px-3 py-1 rounded-full  leading-tight  transition  active:-translate-y-1/4'
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
