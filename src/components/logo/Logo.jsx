import logoUrl from '../../assets/logo.png';
import './logo.css';

export default function Logo({ handleMenu })
{
	return (
		<figure className='logo'>
			<img src={logoUrl} alt='logo' className='logo-img' onClick={handleMenu} />
			<figcaption className='logo-caption'>ShopLineArt</figcaption>
		</figure>
	);
}
