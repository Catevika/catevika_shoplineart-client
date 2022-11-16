import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiHomeSmileFill } from 'react-icons/ri';
import { FaCartArrowDown } from 'react-icons/fa';
import { FcAbout } from 'react-icons/fc';
import { MdContacts } from 'react-icons/md';
import './sidebar.css';
import logoUrl from '../../assets/logo.png';

export default function SideBar() {
	const [toggle, setToggle] = useState(true);
	const handleMenu = () => {
		setToggle(!toggle);
	};
	return (
		<nav className='sidebar__container'>
			<figure className='sidebar__logo'>
				<img
					src={logoUrl}
					alt=''
					className='sidebar__logo-img'
					onClick={handleMenu}
				/>
				<figcaption className='sidebar__logo-caption'>ShopLineArt</figcaption>
			</figure>
			<a href='#main_content' className='skip-link'>
				Skip to content
			</a>
			<ul className='nav__items'>
				<li className='nav-item'>
					<NavLink
						to='/'
						title='Home'
						className={({ isActive }) =>
							isActive ? 'nav__link active-link' : 'nav__link'
						}
					>
						<RiHomeSmileFill className='nav__icon' />
						{toggle ? <span className='nav__title'>Home</span> : null}
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/about'
						title='About'
						className={({ isActive }) =>
							isActive ? 'nav__link active-link' : 'nav__link'
						}
					>
						<FcAbout className='nav__icon nav__icon-white' />
						{toggle ? <span className='nav__title'>About</span> : null}
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/shop'
						title='Shop'
						className={({ isActive }) =>
							isActive ? 'nav__link active-link' : 'nav__link'
						}
					>
						<FaCartArrowDown className='nav__icon' />
						{toggle ? <span className='nav__title'>Shop</span> : null}
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/contact'
						title='Contact'
						className={({ isActive }) =>
							isActive ? 'nav__link active-link' : 'nav__link'
						}
					>
						<MdContacts className='nav__icon' />
						{toggle ? <span className='nav__title'>Contact</span> : null}
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
