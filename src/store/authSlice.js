import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	status: false,
	userData: null,
	profileData: null
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
			state.status = true;
			state.userData = action.payload.userData;
		},
		logout: state => {
			state.status = false;
			state.userData = null;
			state.profileData= null;
		},
		setProfile: (state, action) => {
			state.profileData = action.payload.profileData;
		},
		deleteProfile: state => {
			state.profileData = null;
		}
	}
});

export default authSlice.reducer;
export const {login, logout, setProfile, deleteProfile} = authSlice.actions;
