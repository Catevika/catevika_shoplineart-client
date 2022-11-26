import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/cartContext/cartContext';
import { FaCartArrowDown } from 'react-icons/fa';
import './photo.css';

export default function Photo({ photo, size })
{
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
		<div className='photo__img-container'>
			<div className='photo__img-wrapper'>
				<img
					src={size === 'small'
						? photo.src.small
						: size === 'medium '
							? photo.src.medium
							: size === 'large'
								? photo.src.large : size === 'large2x'
									? photo.src.large2x
									: photo.src.medium}
					alt={photo.alt}
					loading='lazy'
					className='photo__img'
				/>
				<div className='photo__overlay'>
					<div className='photo__text'>
						<a href={photo.photographer_url} className='photo__link'>
							<p>
								<strong>Author:</strong> <span>{photo.photographer}</span>
							</p>
						</a>
						<p>
							<strong>Width:</strong> <span>{photo.width} px</span>
						</p>
						<p>
							<strong>Height:</strong> <span>{photo.height} px</span>
						</p>
					</div>
				</div>
			</div>
			<FaCartArrowDown
				title='Cart'
				className={cart.find(item => item.id === photo.id) ? 'cart__icon-disabled' : 'cart__icon'}
				onClick={addToCart}
			/>
		</div>
	);
};
