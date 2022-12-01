import { useContext } from 'react';
import { Link } from 'react-router-dom';
import JSZip from "jszip";
import saveAs from 'file-saver';
import { AuthContext } from '../../context/authContext/AuthContext';
import { CartContext } from '../../context/cartContext/cartContext';
import { HiMinusCircle } from 'react-icons/hi';
import './cart.css';

export default function Cart() {
	const { user } = useContext(AuthContext).user;
	const { cart, dispatch } = useContext(CartContext);

	const handleDownload = () => {

		const urls = cart.map(item => item.image);
		const texts = cart.map(item => item.authorUrl);

		const saveZip = (filename, urls, texts) => {
			if (!urls) return;
			if (!texts) return;

			const zip = new JSZip();
			const folder = zip.folder('ShopLineArt');
			folder.file("THANK-YOU.text", " Hello, I am Catevika, the developper of the ShopLineArt app. Hope you enjoy it! I am really grateful to PEXELS that allow me to use their services for learning purpose. You can visit their original site anytime: https://www.pexels.com. See also the 'Attributions' folder. It is not mandatory but artists always appreciate it.");

			urls.forEach((url) => {
				const blobPromise = fetch(url).then((r) => {
					if (r.status === 200) return Promise.resolve(r.blob());
					return Promise.reject(new Error(r.statusText));
				});
				const name = url.substring(url.lastIndexOf("/") + 1);

				folder.file(`pexels-photos/${name}`, blobPromise);

				texts.forEach((text) => {
					folder.file(`Attributions/${name}.txt`, 'Free for personal or commercial use. See the number attached to this file to attribute this photo to its autor:' + text + ' OR consider making a donation via PayPal when available on the profile.');
				});
			});

			zip.generateAsync({ type: "blob" }).then((blob) => saveAs(blob, filename));
		};

		saveZip("ShopLineArt.zip", urls, texts);
	};


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
					{cart?.map((item) => {
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
								</div>
							</li>
						);
					})}
					{cart.length > 0 ? <button type='button' onClick={handleDownload} className='cart__zip-btn' >Download ZIP</button> : null}
				</ul> : null}
			</div>
		</div>
	);
}
