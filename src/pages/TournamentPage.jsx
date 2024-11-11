import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
	listTournament as setTournaments,
	setUpcomingTournaments,
	setCompletedTournaments,
	setOngoingTournaments
} from '../store/tournamentSlice.js';
import tournamentService from '../appwrite/tournamentService';
import {TournamentForm, TournamentList} from '../components/Index.js';

const TournamentPage = () => {
	const userData = useSelector(state => state.auth.userData);
	const userProfile = useSelector(state => state.auth.profileData) || null;

	const dispatch = useDispatch();

	const [isAdmin, setIsAdmin] = useState(false);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		if (userData.labels && userData.labels.includes('admin')) {
			setIsAdmin(true);
		} else {
			setIsAdmin(false);
		}
	}, [userData]);

	useEffect(() => {
		const fetchAllTournaments = async () => {
			setLoading(true);

			// Prepare the promises array for each tournament status
			const promises = [
				tournamentService.getAllTournaments(),
				tournamentService.getTournamentsByStatus({
					status: 'upcoming'
					
				}),
				userProfile
					? tournamentService.getTournamentsByStatus({
							status: 'completed',
							playerId: userProfile.playerId
					  })
					: Promise.resolve([]),
				userProfile
					? tournamentService.getTournamentsByStatus({
							status: 'ongoing',
							playerId: userProfile.playerId
					  })
					: Promise.resolve([])
			];

			try {
				const [
					allTournaments,
					upcomingTournaments,
					completedTournaments,
					ongoingTournaments
				] = await Promise.all(promises);

				// Dispatch each tournament data to the store
				dispatch(setTournaments(allTournaments));
				dispatch(setUpcomingTournaments(upcomingTournaments));
				dispatch(setCompletedTournaments(completedTournaments));
				dispatch(setOngoingTournaments(ongoingTournaments));
			} catch (err) {
				console.error('Error fetching tournaments:', err.message);
			} finally {
				setLoading(false); // End loading once all promises are resolved
			}
		};

		if (userProfile) {
			fetchAllTournaments();
		}
	}, [userProfile]);

	return !isLoading ? (
		<div className='w-full min-h-[100dvh]  text-white   '>
			<div className='w-full min-h-[100dvh]'>
				{isAdmin && <TournamentForm />}
				<TournamentList />
			</div>
		</div>
	) : (
		<h1>loading- tp</h1>
	);
};

export default TournamentPage;
