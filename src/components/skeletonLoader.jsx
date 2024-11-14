import React from 'react';
import {useId} from 'react';

export default function SkeletonLoader({
	rows = 3,
	columns = 1,
	className = '',
	itemClassName = ''
}) {
	const id = useId();

	return (
		<div
			className={`grid gap-4 ${className}`}
			style={{gridTemplateColumns: `repeat(${columns}, 1fr)`}}
		>
			{Array.from({length: rows * columns}).map((_, index) => (
				<div
					key={`${id}-${index}`}
					className={`relative h-16 bg-gray-300 dark:bg-gray-700 rounded-md overflow-hidden ${itemClassName}`}
					aria-hidden='true'
				>
					<div className='absolute inset-0 -translate-x-full animate-wave bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700' />
				</div>
			))}
		</div>
	);
}
