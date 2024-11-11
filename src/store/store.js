import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice.js';
import tournamentSlice from './tournamentSlice.js';
const store = configureStore({
	reducer: {
		auth: authSlice,
			tournament: tournamentSlice
	}
});

export default store;
