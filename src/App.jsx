import { Route, Routes } from 'react-router-dom';
import './app.css';
import BasicLayout from './components/basicLayout/BasicLayout';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Shop from './pages/shop/Shop';
import Contact from './pages/contact/Contact';
import NoMatch from './pages/noMatch/NoMatch';

function App() {
	return (
		<div className='app'>
			<Routes>
				<Route path='/' element={<BasicLayout />} end>
					<Route index element={<Home />} />
					<Route path='about' element={<About />} />
					<Route path='shop' element={<Shop />} />
					<Route path='contact' element={<Contact />} />
				</Route>
				<Route path='*' element={<NoMatch />} />
			</Routes>
		</div>
	);
}

export default App;
