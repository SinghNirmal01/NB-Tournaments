import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Logo} from './Index.js';
import {faSpinner, faGamepad} from '@fortawesome/free-solid-svg-icons';

export default function SplashScreen() {
	const [loadingText, setLoadingText] = useState('Loading awesome content');

	useEffect(() => {
		const texts = [
			'Preparing profile',
			'Loading tournaments',
			'Gathering players',
			'Ready to drop'
		];
		let i = 0;

		const intervalId = setInterval(() => {
			setLoadingText(texts[i] + '...');
			i = (i + 1) % texts.length;
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 font-lato'>
			<div className='text-center'>
				<div className='mb-8 relative w-24 h-24 mx-auto'>
					<div className='absolute inset-0 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 dark:from-teal-500 dark:to-teal-700 animate-pulse'>
						<Logo />
					</div>
				</div>
				<h1 className='text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4'>
					NB Tournaments
				</h1>
				<p className='text-xl text-gray-600 dark:text-gray-300 mb-8'>
					Prepare for battle!
				</p>
				<div className='animate-spin text-teal-600 dark:text-teal-400 mb-4'>
					<FontAwesomeIcon
						icon={faSpinner}
						size='3x'
					/>
				</div>
				<p className='text-sm text-gray-500 dark:text-gray-400'>
					{loadingText}
				</p>
			</div>
		</div>
	);
}
