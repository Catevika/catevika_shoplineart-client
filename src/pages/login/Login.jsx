import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { loginCall } from '../../api/apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@mui/material';
import './login.css';

export default function Login() {
	const email = useRef();
	const password = useRef();
	const { isFetching, error, dispatch } = useContext(AuthContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		loginCall(
			{ email: email.current.value, password: password.current.value },
			dispatch
		);
	};

	return (
		<div className='login__form-container'>
			<h2 className='login__form-title'>
				Login to try our <span>virtual shop</span> of the{' '}
				<span>greatest posters </span>
				inline!
			</h2>
			<div className='login__form-wrapper'>
				<form className='login__form' onSubmit={handleSubmit}>
					<div className='login__form-group'>
						<label htmlFor='email' className='login__form-label'>
							Email:
						</label>
						<input
							ref={email}
							name='email'
							type='email'
							autoComplete='username'
							placeholder='Email'
							autoFocus={true}
							required
							className='login__form-input'
						/>
					</div>
					<div className='login__form-group'>
						<label htmlFor='password' className='login__form-label'>
							Password:
						</label>
						<input
							ref={password}
							name='password'
							type='password'
							autoComplete='current-password'
							placeholder='Password'
							required
							minLength='6'
							className='login__form-input'
						/>
					</div>
					<div className='login__btn-group'>
						{isFetching ? (
							<CircularProgress className='loading' color='inherit' />
						) : (
							<button className='login__btn'>Log In</button>
						)}
						{isFetching ? null : (
							<>
								<span>Not registered yet? </span>
								<span>
									<Link to='/' className='login__register-link'>
										Create a new account
									</Link>
								</span>
							</>
						)}
					</div>
					{error ? (
						<div className='error'>Invalid Email or Password. Please retry</div>
					) : null}
				</form>
			</div>
		</div>
	);
}
