import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {setProfile} from '../store/authSlice.js';
import profileService from '../appwrite/profileService.js';
import {useNavigate} from 'react-router-dom';
import {Input, Button, Logo} from '../components/Index.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
	faEnvelope,
	faUser,
	faCopy,
	faGamepad,
	faPencil
} from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
	const userData = useSelector(state => state.auth.userData);
	const userProfile = useSelector(state => state.auth.profileData) || null;
	//	const [userProfile, setUserProfile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: {errors}
	} = useForm();

	const onSubmit = async data => {
		try {
			await profileService
				.createProfile({
					profileData: data,
					id: userData['$id']
				})
				.then(() => {
					dispatch(setProfile({profileData: data}));
					navigate('/');
				});
		} catch (err) {
			console.error('Error creating profile:', err.message);
		}
	};

	return !isLoading ? (
		<div className=' bg-gray-800 '>
			<div className='text-center '></div>

			{!userProfile ? (
				<form
					className='p-4 w-3/4 mx-auto my-10 bg-black/50 rounded-lg text-center text-white backdrop-blur-sm'
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className='text-center mb-4'>
						<p>Ready to Compete?</p>
						<p>Complete Your Profile!</p>
					</div>

					<div className='mt-4'>
						<Input
							label='Username'
							placeholder='Your Username'
							type='text'
							className='placeholder:text-gray-500'
							icon={<FontAwesomeIcon icon={faEnvelope} />}
							{...register('username', {required: true})}
						/>
						{errors.username && (
							<p className='text-red-500'>Username is required</p>
						)}
					</div>

					<div className='mt-4'>
						<Input
							label='Email'
							placeholder='Your Email'
							type='email'
							className='placeholder:text-gray-500'
							icon={<FontAwesomeIcon icon={faEnvelope} />}
							{...register('email', {
								required: true,
								validate: {
									matchPattern: value =>
										/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
											value
										) ||
										'Email address must be a valid address'
								}
							})}
						/>
						{errors.email && (
							<p className='text-red-500'>
								{errors.email.message}
							</p>
						)}
					</div>

					<div className='mt-4'>
						<Input
							label='Player ID'
							placeholder='Your In-game Player ID'
							type='text'
							className='placeholder:text-gray-500'
							icon={<FontAwesomeIcon icon={faEnvelope} />}
							{...register('playerId', {required: true})}
						/>
						{errors.playerId && (
							<p className='text-red-500'>
								Player ID is required
							</p>
						)}
					</div>

					<Button
						className='w-full mt-4'
						type='submit'
					>
						Save
					</Button>
				</form>
			) : (
				<div className='w-full relative mx-auto font-poppins min-h-screen p-4'>
					<div className='w-full mx-auto  text-white bg-stone-800 rounded-full sticky top-0 z-50'>
						<div className='bg-emerald-700 p-4 px-2 rounded-2xl flex flex-col justify-center items-center gap-2 '>
							<div>
								<div className='bg-stone-800 p-6 rounded-full'>
									<FontAwesomeIcon
										className='text-[3em] '
										icon={faUser}
									/>
								</div>
								<div className='font-poppins text-gray-200 text-sm my-1 flex gap-2 justify-center items-center text-[0.5em]'>
									<FontAwesomeIcon
										className='text-[0.5em]'
										icon={faCopy}
									/>
									<div className='text-[0.5em]'>
										{userProfile && userProfile.$id}
									</div>
								</div>
							</div>

							<div className='bg-stone-800 flex flex-col justify-center items-center gap-2  w-full border rounded-2xl p-4 text-[0.5em]  '>
								<div className='flex justify-center items-center gap-2'>
									<div className='w-full max-w-[100%] flex justify-center items-center gap-2  w-full border rounded-2xl p-2 leading-tight overflow-hidden break-all '>
										<FontAwesomeIcon icon={faUser} />

										<input
											className='p-1  w-full bg-stone-800'
											value={
												userProfile &&
												userProfile.username
											}
											disabled
										/>
									</div>
									<FontAwesomeIcon icon={faPencil} />
								</div>
								<div className='flex justify-center items-center gap-2'>
									<div className='w-full max-w-[100%] flex justify-center items-center gap-2  w-full border rounded-2xl p-2 leading-tight '>
										<FontAwesomeIcon icon={faEnvelope} />
										<input
											className='p-1 w-full bg-stone-800 break-all'
											value={
												userProfile && userProfile.email
											}
											disabled
										/>
									</div>
									<FontAwesomeIcon icon={faPencil} />
								</div>
								<div className='flex justify-center items-center gap-2'>
									<div className='w-full max-w-[100%] flex justify-center items-center gap-2  w-full border rounded-2xl p-2 leading-tight overflow-hidden break-all '>
										<FontAwesomeIcon icon={faGamepad} />
										<input
											className='p-1 w-full bg-stone-800'
											value={
												userProfile &&
												userProfile.playerId
											}
											disabled
										/>
									</div>
									<FontAwesomeIcon icon={faPencil} />
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	) : (
		<h1>loading</h1>
	);
};

export default Profile;
