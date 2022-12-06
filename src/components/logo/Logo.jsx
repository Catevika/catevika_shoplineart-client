import { useContext } from 'react';
import { AuthContext } from '../../context/authContext/AuthContext';
import logoUrl from '../../assets/logo.png';
import './logo.css';

export default function Logo({ handleMenu }) {
	const { user, dispatch } = useContext(AuthContext);
	const logout = () => dispatch({ type: 'LOGOUT' });

	return (
		<div className='logo__container'>
			<figure className='logo'>
				<img src={logoUrl} alt='logo' className='logo-img' onClick={handleMenu} />
				<figcaption className='logo-caption'>ShopLineArt</figcaption>
			</figure>
			{user?.user ? <button type='button' onClick={logout} className='logo__btn-logout'>Logout</button> : null}
		</div>
	);
}
