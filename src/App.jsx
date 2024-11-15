import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import authService from './appwrite/auth.js';
import {login, logout} from './store/authSlice.js';
import {useNavigate, Route, Routes} from 'react-router-dom';
import Container from './Container.jsx';
import {SplashScreen} from './components/Index.js';

function App() {
	const [loading, setLoading] = useState(true);
	const [login, setLogin] = useState(false);

	const dispatch = useDispatch();
	useEffect(() => {
		authService
			.getCurrentUser()
			.then(userData => {
				if (userData) {
					dispatch(login({userData}));
					console.log(userData);

					setLogin(true);
				} else {
					dispatch(logout());
				}
			})
			.catch(err => {
				dispatch(logout());

				console.log(err);
			})
			.finally(err => {
				setLoading(false);
			});
	}, []);

	return !loading ? (
		<Container />
	) : (
		<div className='w-full min-h-[100dvh] '>
			<SplashScreen />
		</div>
	);
}

export default App;
