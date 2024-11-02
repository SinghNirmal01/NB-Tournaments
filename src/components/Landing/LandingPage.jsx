import React from 'react';
import {Link} from 'react-router-dom';

const LandingPage = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 text-white'>
			<header className='mb-8'>
				<img
					src='https://placehold.co/200x200'
					alt='App Logo'
					className='w-40'
				/>
			</header>

			<main className='text-center max-w-lg'>
				<h1 className='text-4xl font-bold mb-4'>
					Welcome to BGMI Tournament Hub
				</h1>
				<p className='text-lg mb-4'>
					Join thrilling BGMI tournaments, compete against the best,
					and win amazing prizes!
				</p>
				<p className='text-lg mb-8'>
					Ready to take your gaming skills to the next level? Sign up
					now and join the action!
				</p>

				<div className='flex justify-center space-x-4'>
					<Link
						to='/login'
						className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition'
					>
						Login
					</Link>
					<Link
						to='/signup'
						className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition'
					>
						Sign Up
					</Link>
				</div>
			</main>

			<footer className='mt-8'>
				<p className='text-sm'>
					© 2024 BGMI Tournament Hub. All rights reserved.
				</p>
			</footer>
		</div>
	);
};

export default LandingPage;
