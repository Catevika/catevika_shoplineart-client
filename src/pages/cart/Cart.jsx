import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './cart.css';

export default function Cart() {
	const data = useContext(AuthContext);
	const { user } = data.user;

	console.log(user.username);

	return (
		<div className='cart__container'>
			<div className='cart_welcome-text'>
				{user ? <h2>Hi {`${user.username}`},</h2> : <h3>Cart</h3>}
			</div>
		</div>
	);
}
