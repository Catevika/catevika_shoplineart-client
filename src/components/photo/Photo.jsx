import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/cartContext/cartContext';
import { FaCartArrowDown } from 'react-icons/fa';
import { FiMaximize } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import './photo.css';

export default function Photo({ photo })
{
	const [isShowing, setIsShowing] = useState(false);
	const toggle = () => setIsShowing(!isShowing);

	const { cart, dispatch } = useContext(CartContext);

	const addToCart = () =>
	{
		dispatch({
			type: 'ADD_TO_CART',
			item: {
				id: photo.id,
				author: photo.photographer,
				authorUrl: photo.photographer_url,
				description: photo.alt,
				image: photo.src.original,
				width: photo.width,
				height: photo.height
			}
		});
	};

	return (
		<>
			<img
				src={isShowing ? photo.src.large : photo.src.medium}
				alt={photo.alt}
				loading='lazy'
				className='photo__img'
			/>
			<FaCartArrowDown
				title='Cart'
				className={cart.find(item => item.id === photo.id) ? 'cart__icon-disabled' : 'cart__icon'}
				onClick={addToCart}
			/>
			<div className='photo__overlay'>
				<div className='photo__text'>
					<a href={photo.photographer_url} className='photo__link'>
						<p>
							Author: <span>{photo.photographer}</span>
						</p>
						<p>
							Width: <span>{photo.width} px</span>
						</p>
						<p>
							Height: <span>{photo.height} px</span>
						</p>
					</a>
				</div>
				{isShowing ? (
					<MdClose
						title='View medium size'
						className='photo__icon'
						onClick={toggle}
					/>
				) : (
					<FiMaximize
						title='View large size'
						className='photo__icon'
						onClick={toggle}
					/>
				)}
			</div>
		</>
	);
}
