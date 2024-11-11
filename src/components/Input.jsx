import React, {useId} from 'react';
import '../Glow.css';

const Input = React.forwardRef(function Input(
	{label, type = 'text', icon, className = '', ...props},
	ref
) {
	const id = useId();

	return (
		<div className='relative w-full text-center'>
			{label && (
				<label
					className='inline-block bg-black/50  mb-0 rounded-t-lg p-1 px-2'
					htmlFor={id}
				>
					{label}
				</label>
			)}
			<div className=' flex justify-center items-center'>
				{icon && (
					<div className='absolute left-3  transform  text-black'>
						{icon}
					</div>
				)}

				<input
					type={type}
					className={`px-3 py-2 pl-10 rounded-lg bg-white/50 text-black placeholder:text-black/20 outline-none duration-200 border border-stone-800 shadow-inner w-full   focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black/50  transition duration-300 ${className}`}
					ref={ref}
					{...props}
					id={id}
				/>
			</div>
		</div>
	);
});

export default Input;
