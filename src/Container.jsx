import React from 'react';
import {useNavigate, Route, Routes} from 'react-router-dom';
import {LoginPage, SignupPage, Home} from './components/Index.js';
import PrivateRoutes from './utils/PrivateRoutes.jsx';
function Container() {
	return (
		<Routes>
			<Route element={<PrivateRoutes />}>
				<Route
					path='/'
					element={ <Home />}
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
