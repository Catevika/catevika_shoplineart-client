import { Outlet } from 'react-router-dom';
import SideBar from '../sideBar/SideBar';
import Footer from '../footer/Footer';

export default function BasicLayout() {
	return (
		<>
			<SideBar />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}
