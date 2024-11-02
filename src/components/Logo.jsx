import React from 'react';

function Logo({width = '100px'}) {
	return (
		<div>
			<img
			className="rounded-lg"
				src='/logo.jpeg'
				alt='logo'
				width={width}
			/>
		</div>
	);
}

export default Logo;
