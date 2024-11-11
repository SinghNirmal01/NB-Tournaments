import React from 'react';
import {useNavigate, Route, Routes} from 'react-router-dom';
import {LoginPage, SignupPage, Home, Profile, Tournament} from './pages/index.js';
import PrivateRoutes from './utils/PrivateRoutes.jsx';
function Container() {
	return (
		<Routes>
			<Route element={<PrivateRoutes />}>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/profile'
					element={<Profile />}
				/>
				<Route
					path='/tournament'
					element={<Tournament />}
				/>
			</Route>
			<Route
				path='/login'
				element={<LoginPage />}
			/>
			<Route
				path='/signup'
				element={<SignupPage />}
			/>
		</Routes>
	);
}

export default Container;
