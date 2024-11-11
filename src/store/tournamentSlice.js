import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	tournaments: [],
	upcomingTournaments: [],
	completedTournaments: [],
	ongoingTournaments: []
};

const tournamentSlice = createSlice({
	name: 'tournament',
	initialState,
	reducers: {
		listTournament: (state, action) => {
			// Adds a new tournament to the tournaments array
			state.tournaments = action.payload;
		},
		setUpcomingTournaments: (state, action) => {
			// Adds a new tournament to the tournaments array
			state.upcomingTournaments = action.payload;
		},
		setCompletedTournaments: (state, action) => {
			// Adds a new tournament to the tournaments array
			state.completedTournaments = action.payload;
		},
		setOngoingTournaments: (state, action) => {
			// Adds a new tournament to the tournaments array
			state.ongoingTournaments = action.payload;
		},
		createTournament: (state, action) => {
			// Adds a new tournament to the tournaments array
			state.tournaments.push(action.payload);
		},
		deleteTournament: (state, action) => {
			// Removes a tournament by its ID from the tournaments array
			state.tournaments = state.tournaments.filter(
				tournament => tournament.id !== action.payload
			);
		},
		updateTournament: (state, action) => {
			// Updates an existing tournament based on its ID
			const index = state.tournaments.findIndex(
				tournament => tournament.id === action.payload.id
			);
			if (index !== -1) {
				state.tournaments[index] = {
					...state.tournaments[index],
					...action.payload.updates
				};
			}
		}
	}
});

export default tournamentSlice.reducer;
export const {
	listTournament,
	setUpcomingTournaments,
	setCompletedTournaments,
	setOngoingTournaments,
	createTournament,
	deleteTournament,
	updateTournament
} = tournamentSlice.actions;
