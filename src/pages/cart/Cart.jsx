import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext/AuthContext';
import { CartContext } from '../../context/cartContext/cartContext';
import './cart.css';

// TODO: See Home css to apply to Cart regarding the Nav-items + Size of the Cart view

export default function Cart()
{
	const { user } = useContext(AuthContext).user;
	const { cart } = useContext(CartContext);


	return (
		<div className='cart__container'>
			<div className='cart__wrapper'>
				<div className='cart_welcome-text'>
					<p>
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
								<div className='cart__item-text'>
									<div className='cart__item-text-out'>
										<p><strong>Author:</strong> {item.author}</p>
										<p><strong>Description:</strong> {item.description}</p>
										<p><strong>Width:</strong> {item.width} px - <strong>Height:</strong> {item.height} px</p>
									</div>
									<p><strong>License:</strong> Free with <strong>attribution</strong> to <a href={item.authorUrl}><span>{item.author}</span></a> </p>
									<p>OR <strong>donation</strong> via <strong>PayPal</strong> if available</p>
								</div>
							</li>
						);
					})}
				</ul> : null}
			</div>
		</div>
	);
}
