import React from 'react';
import {LogoutBtn} from './Index.js';
const Home = () => {
	return (
		<>
			<div className='w-full min-h-[100dvh] mx-auto text-center text-2xl'>
				<p>login successfull</p>
				<LogoutBtn />
			</div>
		</>
	);
};

export default Home;
