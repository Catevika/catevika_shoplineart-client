import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext/AuthContext';
import { CartContext } from '../../context/cartContext/cartContext';
import { HiMinusCircle } from 'react-icons/hi';
import './cart.css';

export default function Cart()
{
	const { user } = useContext(AuthContext).user;
	const { cart, dispatch } = useContext(CartContext);

	return (
		<div className='cart__container'>
			<div className='cart__wrapper'>
				<div className='cart_welcome-text'>
					<p title='Welcome'>
						Hi&nbsp;<span>{user?.username}!</span>
						{cart.length
							? "Let's check your cart:"
							: "Let's put some photos in your cart!"}
					</p>
					<Link to='/home'>
						<button title='Home' className='cart_welcome-btn-link'>
							Go to home
						</button>
					</Link>
				</div>
				{cart.length > 0 ? <ul className='cart__items-list'>
					{cart?.map((item) =>
					{
						return (
							<li key={item.id} className='cart__item'>
								<img
									src={item.image}
									alt={item.description}
									className='cart__item-img'
								/>
								<div className='cart__item-icon-container'>
									<HiMinusCircle title='Remove from cart' className='cart__item-icon' onClick={() => dispatch({
										type: 'REMOVE_FROM_CART',
										id: item.id
									})
									} />
								</div>
								<div className='cart__item-text'>
									<div className='cart__item-text-out'>
										<p title='Author'><strong>Author:</strong> {item.author}</p>
										<p title='Description'><strong>Description:</strong> {item.description}</p>
										<p title='Width'><strong>Width:</strong> {item.width} px - <strong>Height:</strong> {item.height} px</p>
									</div>
									<p title={item.authorUrl}><strong>License:</strong> Free with <strong>attribution</strong> to <a href={item.authorUrl}><span>{item.author}</span></a> </p>
									<p title='Paypal Donation'>OR <strong>donation</strong> via <strong>PayPal</strong> if available</p>
								</div>
							</li>
						);
					})}
				</ul> : null}
			</div>
		</div>
	);
}
