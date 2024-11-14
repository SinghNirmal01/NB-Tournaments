import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice.js';
import tournamentSlice from './tournamentSlice.js';
import themeSlice from './themeSlice.js'
const store = configureStore({
	reducer: {
		auth: authSlice,
			tournament: tournamentSlice,theme:themeSlice
	}
});

export default store;
