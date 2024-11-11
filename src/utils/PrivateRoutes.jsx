import {useEffect, useState} from 'react';
import {Outlet, Navigate, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import authService from '../appwrite/auth';
import profileService from '../appwrite/profileService.js';

import {login as setUser, setProfile} from '../store/authSlice'; // Action to set user in Redux

const PrivateRoutes = () => {
	const dispatch = useDispatch();
	const [userData, setUserData] = useState(null);
	const [userProfile, setUserProfile] = useState(null);
	const navigate = useNavigate();
	useEffect(() => {
		const checkUser = async () => {
			try {
				const currentUser = await authService.getCurrentUser();
				setUserData(currentUser);
				if (currentUser) {
					dispatch(setUser({userData: currentUser})); // Update Redux with the user data
					try {
						const profile = await profileService.getProfile(
							currentUser['$id']
						);
						if (profile) {
							setUserProfile(profile);
							dispatch(setProfile({profileData: profile})); // Update Redux with the user data
						} else {
							navigate('/profile');
						}
					} catch (err) {
						navigate('/profile');
						console.log('Error getting profile:', err.message);
					}
				} else {
					navigate('/login');
				}
			} catch (err) {
				console.log('Error fetching user:', err);
				navigate('/login');
			}
		};
		checkUser();
	}, [dispatch]);
	
	return userData ? <Outlet /> : <h1>pr-loading</h1>;
};

export default PrivateRoutes;
