import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

export default function Button({
	children,
	type = 'button',
	bgColor = 'bg-blue-600',
	textColor = 'text-white',
	className = '',
	loading = false,
	...props
}) {
	return (
		<button
			className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
			{...props}
		>
			<div className={`${loading ? 'hidden' : 'block'}`}>{children}</div>
			<div className={`${loading ? 'block' : 'hidden'}`}>
				<FontAwesomeIcon
					icon={faSpinner}
					spinPulse
				/>
			</div>
		</button>
	);
}
