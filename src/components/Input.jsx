import React, {useId} from 'react';
import '../Glow.css';

const Input = React.forwardRef(function Input(
	{label, type = 'text', icon, className = '', ...props},
	ref
) {
	const id = useId();

	return (
		<div className='relative w-full'>
			{label && (
				<label
					className='inline-block mb-1 pl-1'
					htmlFor={id}
				>
					{label}
				</label>
			)}

			{icon && (
				<div className='absolute left-3 top-1/2 transform  text-black'>
					{icon}
				</div>
			)}

			<input
				type={type}
				
				className={`px-3 py-2 pl-10 rounded-lg bg-white/50 text-black placeholder:text-black/20 outline-none duration-200 
                            border border-stone-800 shadow-inner w-full focus:ring-4 focus:ring-indigo-500 
                            focus:ring-opacity-70 custom-focus-glow ${className}`}
				ref={ref}
				{...props}
				id={id}
			/>
		</div>
	);
});

export default Input;
