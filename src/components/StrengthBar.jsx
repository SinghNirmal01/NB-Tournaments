// StrengthBar.jsx
import React from 'react';

const StrengthBar = ({password}) => {
	const getStrength = password => {
		let strength = 0;

		if (password.length >= 6) strength++; // Basic length check
		if (password.length >= 10) strength++; // Bonus for longer passwords
		if (/[A-Z]/.test(password)) strength++; // Uppercase letter
		if (/[0-9]/.test(password)) strength++; // Number
		if (/[^A-Za-z0-9]/.test(password)) strength++; // Special character

		return strength;
	};

	const strength = getStrength(password);

	// Colors and width for each strength level
	const strengthColor = [
		'bg-red-500',
		'bg-yellow-500',
		'bg-yellow-400',
		'bg-green-500',
		'bg-emerald-500'
	];
	const strengthWidth = ['w-0', 'w-2/5', 'w-3/5', 'w-4/5', 'w-full'];

	return (
		<div className='mt-2 h-2 w-full bg-gray-200 rounded-md overflow-hidden'>
			<div
				className={`h-full ${strengthColor[strength]} ${strengthWidth[strength]} transition-all duration-300`}
			/>
		</div>
	);
};

export default StrengthBar;
