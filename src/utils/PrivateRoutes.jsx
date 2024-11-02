import {useEffect, useState} from 'react';
import {Outlet, Navigate, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import authService from '../appwrite/auth';
import {login as setUser} from '../store/authSlice'; // Action to set user in Redux

const PrivateRoutes = () => {
	const dispatch = useDispatch();
  const [userData, setUserData] = useState(null)
  const navigate= useNavigate()
	useEffect(() => {
		const checkUser = async () => {
			try {
				const currentUser = await authService.getCurrentUser();
				console.log(currentUser);
			  setUserData(currentUser)
				if (currentUser) {
					dispatch(setUser({userData: currentUser})); // Update Redux with the user data
				}
				else {
				  navigate("/login")
				}
			} catch (err) {
				console.log('Error fetching user:', err);
			}
		};
		checkUser();
	}, [dispatch]);

	
	console.log(userData);
	return userData ? <Outlet /> : null;
};

export default PrivateRoutes;
