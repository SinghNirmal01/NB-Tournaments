// src/components/ToggleDarkModeButton.js
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toggleDarkMode} from '../store/themeSlice.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSun, faMoon} from '@fortawesome/free-solid-svg-icons';
const ToggleTheme = () => {
	const dispatch = useDispatch();
	const darkMode = useSelector(state => state.theme.darkMode);

	const handleToggle = () => {
		dispatch(toggleDarkMode());
		document.documentElement.classList.toggle('dark', !darkMode); // Toggle Tailwind dark mode class
	};

	return (
	  <div onClick={handleToggle}>
		<button
			
			className='p-2 flex  items-center justify-center  text-[1em]'
		>
			{darkMode ? (
				<FontAwesomeIcon
					
					icon={faMoon}
				/>
			) : (
				<FontAwesomeIcon
					
					icon={faSun}
				/>
			)}
		</button>
		</div>
	);
};

export default ToggleTheme;
