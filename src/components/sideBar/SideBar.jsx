import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../logo/Logo';
import { RiHomeSmileFill } from 'react-icons/ri';
import { FaCartArrowDown } from 'react-icons/fa';
import { FcAbout } from 'react-icons/fc';
import { MdContacts } from 'react-icons/md';
import './sidebar.css';

export default function SideBar() {
	const [toggle, setToggle] = useState(true);
	const handleMenu = () => {
		setToggle(!toggle);
	};
	return (
		<aside
			className={
				toggle ? 'sidebar__container' : 'sidebar__container no__border'
			}
		>
			<Logo handleMenu={handleMenu} />
			<nav className='nav__container'>
				<ul className='nav__items'>
					<li>
						<NavLink
							to='/home'
							title='Home'
							className={({ isActive }) =>
								isActive ? 'nav__link active-link' : 'nav__link'
							}
						>
							<RiHomeSmileFill className='nav__icon' />
							{toggle ? <span>Home</span> : null}
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
							{toggle ? <span>About</span> : null}
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/cart'
							title='Cart'
							className={({ isActive }) =>
								isActive ? 'nav__link active-link' : 'nav__link'
							}
						>
							<FaCartArrowDown className='nav__icon' />
							{toggle ? <span>Cart</span> : null}
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
							{toggle ? <span>Contact</span> : null}
						</NavLink>
					</li>
				</ul>
			</nav>
		</aside>
	);
}
