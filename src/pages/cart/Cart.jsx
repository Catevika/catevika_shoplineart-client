import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext/AuthContext';
import { CartContext } from '../../context/cartContext/cartContext';
import './cart.css';

export default function Cart()
{
	const { user } = useContext(AuthContext).user;
	const { cart } = useContext(CartContext);


	return (
		<div className='cart__container'>
			<div className='cart__wrapper'>
				<div className='cart_welcome-text'>
					<h3>
						Hi <span>{user?.username}</span>, here{' '}
						{cart.length
							? cart.length === 1 ? 'is the photo currently in your cart: ' : 'are the photos currently in your cart:'
							: "let's put some photos in your cart!"}
					</h3>
					<Link to='/home'>
						<button title='Home' className='cart_welcome-btn-link'>
							Go to home
						</button>
					</Link>
				</div>
				<ul className='cart__items-list'>
					{cart?.map((item) =>
					{
						return (
							<li key={item.id} className='cart__item'>
								<img
									src={item.image}
									alt={item.description}
									className='cart__item-img'
								/>
								<div className='cart__item-text'>
									<div className='cart__item-text-out'>
										<p><strong>Author:</strong> {item.author}</p>
										<p><strong>Description:</strong> {item.description}</p>
										<p><strong>Width:</strong> {item.width} px</p>
										<p><strong>Height:</strong> {item.height} px</p>
									</div>
									<p><strong>Price:</strong> Free with <strong>attribution</strong> to <a href={item.authorUrl}><span>{item.authorUrl}</span></a> OR <strong>donation</strong> via <strong>PayPal</strong> if the author is affiliated</p>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
